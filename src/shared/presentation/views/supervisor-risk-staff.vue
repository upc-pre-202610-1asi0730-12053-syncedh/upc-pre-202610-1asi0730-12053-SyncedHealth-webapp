<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";

const { t } = useI18n();

const medicalStaff = ref([]);
const searchTerm = ref("");
const selectedArea = ref("");
const selectedRiskLevel = ref("");

const apiUrl = import.meta.env.VITE_CORTISENSE_API_URL;

const AT_RISK_LEVELS = ["high", "critical"];

/**
 * Loads medical staff from the mock API.
 *
 * @returns {Promise<void>}
 */
async function loadMedicalStaff() {
  try {
    const response = await axios.get(`${apiUrl}/medical_staff`);
    medicalStaff.value = response.data;
  } catch (error) {
    console.error("Error loading medical staff:", error);
    medicalStaff.value = [];
  }
}

const atRiskStaff = computed(() => {
  return medicalStaff.value.filter((staff) =>
    AT_RISK_LEVELS.includes(staff.riskLevel)
  );
});

const areas = computed(() => {
  return [
    ...new Set(
      atRiskStaff.value
        .map((staff) => staff.workArea || staff.area)
        .filter(Boolean)
    ),
  ];
});

const criticalCount = computed(() => {
  return atRiskStaff.value.filter((staff) => staff.riskLevel === "critical").length;
});

const highCount = computed(() => {
  return atRiskStaff.value.filter((staff) => staff.riskLevel === "high").length;
});

const withoutDeviceCount = computed(() => {
  return atRiskStaff.value.filter((staff) => !staff.assignedDeviceId).length;
});

const filteredStaff = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();

  return atRiskStaff.value.filter((staff) => {
    const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase();
    const area = staff.workArea || staff.area || "";

    const matchesSearch =
      !term ||
      fullName.includes(term) ||
      staff.email?.toLowerCase().includes(term) ||
      area.toLowerCase().includes(term);

    const matchesArea = !selectedArea.value || area === selectedArea.value;
    const matchesRisk =
      !selectedRiskLevel.value || staff.riskLevel === selectedRiskLevel.value;

    return matchesSearch && matchesArea && matchesRisk;
  });
});

/**
 * @param {Object} staff
 * @returns {string}
 */
function getInitials(staff) {
  return `${staff.firstName?.charAt(0) || ""}${staff.lastName?.charAt(0) || ""}`.toUpperCase();
}

onMounted(loadMedicalStaff);
</script>

<template>
  <section class="staff-page">
    <div class="page-header">
      <div>
        <h1>{{ t("supervisorRisk.title") }}</h1>
        <p>{{ t("supervisorRisk.subtitle") }}</p>
      </div>
    </div>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-exclamation-triangle" />
        </div>
        <span>{{ t("supervisorRisk.totalAtRisk") }}</span>
        <strong>{{ atRiskStaff.length }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon critical">
          <i class="pi pi-ban" />
        </div>
        <span>{{ t("staff.critical") }}</span>
        <strong>{{ criticalCount }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon high">
          <i class="pi pi-chart-line" />
        </div>
        <span>{{ t("staff.high") }}</span>
        <strong>{{ highCount }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon blue">
          <i class="pi pi-stopwatch" />
        </div>
        <span>{{ t("staff.withoutDevice") }}</span>
        <strong>{{ withoutDeviceCount }}</strong>
      </article>
    </section>

    <section class="table-section">
      <div class="filters-row">
        <input
          v-model="searchTerm"
          :placeholder="t('supervisorRisk.search')"
        />

        <select v-model="selectedArea">
          <option value="">{{ t("staff.allAreas") }}</option>
          <option v-for="area in areas" :key="area" :value="area">
            {{ area }}
          </option>
        </select>

        <select v-model="selectedRiskLevel">
          <option value="">{{ t("supervisorRisk.allAtRiskLevels") }}</option>
          <option value="high">{{ t("staff.high") }}</option>
          <option value="critical">{{ t("staff.critical") }}</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{{ t("staff.name") }}</th>
              <th>{{ t("staff.area") }}</th>
              <th>{{ t("staff.specialty") }}</th>
              <th>{{ t("staff.risk") }}</th>
              <th>{{ t("staff.fatigue") }}</th>
              <th>{{ t("staff.status") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="filteredStaff.length === 0">
              <td colspan="6" class="empty-state">
                {{ t("supervisorRisk.empty") }}
              </td>
            </tr>

            <tr v-for="staff in filteredStaff" :key="staff.id">
              <td>
                <div class="professional-cell">
                  <div class="avatar">{{ getInitials(staff) }}</div>
                  <div>
                    <strong>{{ staff.firstName }} {{ staff.lastName }}</strong>
                    <span>{{ staff.email }}</span>
                  </div>
                </div>
              </td>
              <td>{{ staff.workArea || staff.area }}</td>
              <td>{{ staff.specialty }}</td>
              <td>
                <span class="badge" :class="`risk-${staff.riskLevel}`">
                  {{ t(`staff.${staff.riskLevel}`) }}
                </span>
              </td>
              <td><strong>{{ staff.fatigueLevel }}%</strong></td>
              <td>
                <span class="badge" :class="`status-${staff.status}`">
                  {{ t(`staff.${staff.status}`) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style scoped>
.staff-page {
  width: 100%;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.page-header p {
  margin: 0;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 16px;
  font-weight: 500;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 32px;
}

.summary-card {
  min-height: 150px;
  padding: 26px;
  border: 1px solid #d8ecec;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(14, 36, 51, 0.05);
}

.summary-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  border-radius: 12px;
  background: rgba(69, 221, 229, 0.16);
  color: var(--cs-dark, #0e2433);
}

.summary-icon.warning {
  color: #7a6b00;
}

.summary-icon.critical {
  color: #c93b3b;
}

.summary-icon.high {
  color: #c26a00;
}

.summary-icon.blue {
  color: #3248a8;
}

.summary-card span {
  display: block;
  margin-bottom: 10px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 14px;
  font-weight: 700;
}

.summary-card strong {
  color: var(--cs-dark, #0e2433);
  font-size: 34px;
  font-weight: 800;
}

.table-section {
  padding: 24px;
  border: 1px solid #d8ecec;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(14, 36, 51, 0.05);
}

.filters-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

input,
select {
  height: 48px;
  width: 100%;
  padding: 0 14px;
  border: 1px solid #d5e3ea;
  border-radius: 10px;
  background: #ffffff;
  color: var(--cs-dark, #0e2433);
  font-family: inherit;
  font-size: 14px;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--cs-primary, #45dde5);
  box-shadow: 0 0 0 3px rgba(69, 221, 229, 0.18);
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1px solid #e8f0f3;
}

th {
  padding: 18px 14px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 13px;
  font-weight: 800;
  text-align: left;
}

td {
  padding: 16px 14px;
  border-bottom: 1px solid #eef4f6;
  color: var(--cs-dark, #0e2433);
  font-size: 14px;
  vertical-align: middle;
}

.professional-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(69, 221, 229, 0.42);
  border-radius: 14px;
  background: rgba(69, 221, 229, 0.13);
  color: var(--cs-dark, #0e2433);
  font-size: 13px;
  font-weight: 800;
}

.professional-cell strong {
  display: block;
  font-weight: 800;
}

.professional-cell span {
  display: block;
  margin-top: 3px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 12px;
}

.badge {
  display: inline-flex;
  min-width: 78px;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.status-active {
  background: rgba(69, 221, 229, 0.18);
  color: #087b79;
}

.status-inactive {
  background: #eeeeee;
  color: #4f555a;
}

.risk-high {
  background: #fff0df;
  color: #c26a00;
}

.risk-critical {
  background: #ffe5e5;
  color: #c93b3b;
}

.empty-state {
  padding: 42px 14px;
  color: var(--cs-gray-dark, #4f555a);
  text-align: center;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filters-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
