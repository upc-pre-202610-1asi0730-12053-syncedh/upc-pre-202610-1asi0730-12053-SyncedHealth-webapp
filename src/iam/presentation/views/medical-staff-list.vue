<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import axios from "axios";

const { t } = useI18n();
const router = useRouter();

const medicalStaff = ref([]);
const searchTerm = ref("");
const selectedArea = ref("");
const selectedRole = ref("");
const selectedStatus = ref("");
const selectedRiskLevel = ref("");

const apiUrl = import.meta.env.VITE_CORTISENSE_API_URL || "http://localhost:3000/api/v1";

/**
 * Loads medical staff records from the mock API.
 *
 * @returns {Promise<void>}
 */
async function loadMedicalStaff() {
  try {
    const response = await axios.get(`${apiUrl}/medical_staff`);
    medicalStaff.value = response.data;
  } catch (error) {
    console.error("Error loading medical staff records:", error);
    medicalStaff.value = [];
  }
}

/**
 * Navigates to the medical staff registration form.
 *
 * @returns {void}
 */
function goToCreate() {
  router.push("/admin/staff/new");
}

/**
 * Navigates to the medical staff detail view.
 *
 * @param {string} id - Medical staff identifier.
 * @returns {void}
 */
function goToDetail(id) {
  router.push(`/admin/staff/${id}`);
}

/**
 * Navigates to the medical staff edition form.
 *
 * @param {string} id - Medical staff identifier.
 * @returns {void}
 */
function goToEdit(id) {
  router.push(`/admin/staff/${id}/edit`);
}

/**
 * Deletes a medical staff record from the mock API.
 *
 * @param {string} id - Medical staff identifier.
 * @returns {Promise<void>}
 */
async function deleteStaff(id) {
  const confirmed = confirm(t("staff.confirmDelete"));

  if (!confirmed) return;

  await axios.delete(`${apiUrl}/medical_staff/${id}`);
  medicalStaff.value = medicalStaff.value.filter((staff) => staff.id !== id);
}

const areas = computed(() => {
  return [...new Set(medicalStaff.value.map((staff) => staff.workArea || staff.area).filter(Boolean))];
});

const totalStaff = computed(() => medicalStaff.value.length);

const activeStaff = computed(() => {
  return medicalStaff.value.filter((staff) => staff.status === "active").length;
});

const riskStaff = computed(() => {
  return medicalStaff.value.filter((staff) =>
      ["high", "critical"].includes(staff.riskLevel)
  ).length;
});

const withoutDevice = computed(() => {
  return medicalStaff.value.filter((staff) => !staff.assignedDeviceId).length;
});

const filteredMedicalStaff = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();

  return medicalStaff.value.filter((staff) => {
    const fullName = `${staff.firstName} ${staff.lastName}`.toLowerCase();
    const area = staff.workArea || staff.area || "";

    const matchesSearch =
        !term ||
        fullName.includes(term) ||
        staff.email?.toLowerCase().includes(term) ||
        staff.documentNumber?.toLowerCase().includes(term) ||
        staff.specialty?.toLowerCase().includes(term) ||
        area.toLowerCase().includes(term);

    const matchesArea = !selectedArea.value || area === selectedArea.value;
    const matchesRole = !selectedRole.value || staff.role === selectedRole.value || staff.staffRole === selectedRole.value;
    const matchesStatus = !selectedStatus.value || staff.status === selectedStatus.value;
    const matchesRisk = !selectedRiskLevel.value || staff.riskLevel === selectedRiskLevel.value;

    return matchesSearch && matchesArea && matchesRole && matchesStatus && matchesRisk;
  });
});

/**
 * Builds initials from the professional name.
 *
 * @param {Object} staff - Medical staff resource.
 * @returns {string} Initials.
 */
function getInitials(staff) {
  return `${staff.firstName?.charAt(0) || ""}${staff.lastName?.charAt(0) || ""}`.toUpperCase();
}

/**
 * Resolves translated role label.
 *
 * @param {Object} staff - Medical staff resource.
 * @returns {string} Role label.
 */
function getRoleLabel(staff) {
  const role = staff.role || staff.staffRole;

  if (role === "clinical_supervisor") return t("staff.clinicalSupervisor");
  return t("staff.medicalStaff");
}

onMounted(loadMedicalStaff);
</script>

<template>
  <section class="staff-page">
    <div class="page-header">
      <div>
        <h1>{{ t("staff.managementTitle") }}</h1>
        <p>{{ t("staff.managementSubtitle") }}</p>
      </div>

      <button class="primary-button" type="button" @click="goToCreate">
        + {{ t("staff.new") }}
      </button>
    </div>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon purple">
          <i class="pi pi-users" />
        </div>
        <span>{{ t("staff.totalStaff") }}</span>
        <strong>{{ totalStaff }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon teal">
          <i class="pi pi-check" />
        </div>
        <span>{{ t("staff.activeStaff") }}</span>
        <strong>{{ activeStaff }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-exclamation-triangle" />
        </div>
        <span>{{ t("staff.riskStaffCount") }}</span>
        <strong>{{ riskStaff }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon blue">
          <i class="pi pi-stopwatch" />
        </div>
        <span>{{ t("staff.withoutDevice") }}</span>
        <strong>{{ withoutDevice }}</strong>
      </article>
    </section>

    <section class="table-section">
      <div class="filters-row">
        <input
            v-model="searchTerm"
            :placeholder="t('staff.searchExtended')"
        />

        <select v-model="selectedArea">
          <option value="">{{ t("staff.allAreas") }}</option>
          <option
              v-for="area in areas"
              :key="area"
              :value="area"
          >
            {{ area }}
          </option>
        </select>

        <select v-model="selectedRole">
          <option value="">{{ t("staff.allRoles") }}</option>
          <option value="medical_staff">{{ t("staff.medicalStaff") }}</option>
          <option value="clinical_supervisor">{{ t("staff.clinicalSupervisor") }}</option>
        </select>

        <select v-model="selectedStatus">
          <option value="">{{ t("staff.allStatuses") }}</option>
          <option value="active">{{ t("staff.active") }}</option>
          <option value="inactive">{{ t("staff.inactive") }}</option>
        </select>

        <select v-model="selectedRiskLevel">
          <option value="">{{ t("staff.allRisks") }}</option>
          <option value="low">{{ t("staff.low") }}</option>
          <option value="moderate">{{ t("staff.moderate") }}</option>
          <option value="high">{{ t("staff.high") }}</option>
          <option value="critical">{{ t("staff.critical") }}</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>{{ t("staff.name") }}</th>
            <th>{{ t("staff.email") }}</th>
            <th>{{ t("staff.role") }}</th>
            <th>{{ t("staff.area") }}</th>
            <th>{{ t("staff.specialty") }}</th>
            <th>{{ t("staff.status") }}</th>
            <th>{{ t("staff.risk") }}</th>
            <th>{{ t("staff.fatigue") }}</th>
            <th>{{ t("staff.actions") }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-if="filteredMedicalStaff.length === 0">
            <td colspan="9" class="empty-state">
              {{ t("staff.empty") }}
            </td>
          </tr>

          <tr
              v-for="staff in filteredMedicalStaff"
              :key="staff.id"
          >
            <td>
              <div class="professional-cell">
                <div class="avatar">
                  {{ getInitials(staff) }}
                </div>

                <div>
                  <strong>{{ staff.firstName }} {{ staff.lastName }}</strong>
                  <span>DNI {{ staff.documentNumber }}</span>
                </div>
              </div>
            </td>

            <td>{{ staff.email }}</td>
            <td>{{ getRoleLabel(staff) }}</td>
            <td>{{ staff.workArea || staff.area }}</td>
            <td>{{ staff.specialty }}</td>

            <td>
                <span class="badge" :class="`status-${staff.status}`">
                  {{ t(`staff.${staff.status}`) }}
                </span>
            </td>

            <td>
                <span class="badge" :class="`risk-${staff.riskLevel}`">
                  {{ t(`staff.${staff.riskLevel}`) }}
                </span>
            </td>

            <td>
              <strong>{{ staff.fatigueLevel }}%</strong>
            </td>

            <td>
              <div class="actions">
                <button type="button" class="link-button view" @click="goToDetail(staff.id)">
                  {{ t("staff.view") }}
                </button>

                <button type="button" class="link-button edit" @click="goToEdit(staff.id)">
                  {{ t("staff.edit") }}
                </button>

                <button type="button" class="link-button delete" @click="deleteStaff(staff.id)">
                  {{ t("staff.delete") }}
                </button>
              </div>
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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
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

.primary-button {
  min-height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 12px;
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 16px 28px rgba(69, 221, 229, 0.25);
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

.summary-icon.purple {
  color: #5633a1;
}

.summary-icon.teal {
  color: #0e7c7b;
}

.summary-icon.warning {
  color: #7a6b00;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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

.risk-low {
  background: #e8f8ec;
  color: #23934d;
}

.risk-moderate {
  background: #fff8d6;
  color: #9a7b00;
}

.risk-high {
  background: #fff0df;
  color: #c26a00;
}

.risk-critical {
  background: #ffe5e5;
  color: #c93b3b;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.link-button {
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
}

.link-button.view,
.link-button.edit {
  color: #087b79;
}

.link-button.delete {
  color: #d33333;
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
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 700px) {
  .page-header {
    flex-direction: column;
  }

  .summary-grid,
  .filters-row {
    grid-template-columns: 1fr;
  }
}
</style>