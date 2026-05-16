<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";

const { t } = useI18n();

const alerts = ref([]);
const staffById = ref({});
const statusFilter = ref("all");

const apiUrl = import.meta.env.VITE_CORTISENSE_API_URL || "http://localhost:3000";

/**
 * Loads alerts and medical staff for name resolution.
 *
 * @returns {Promise<void>}
 */
async function loadData() {
  try {
    const [alertsResponse, staffResponse] = await Promise.all([
      axios.get(`${apiUrl}/alerts`),
      axios.get(`${apiUrl}/medical_staff`),
    ]);

    alerts.value = alertsResponse.data;
    staffById.value = Object.fromEntries(
      staffResponse.data.map((staff) => [staff.id, staff])
    );
  } catch (error) {
    console.error("Error loading clinical alerts:", error);
    alerts.value = [];
    staffById.value = {};
  }
}

const pendingCount = computed(() => {
  return alerts.value.filter((alert) => alert.status === "pending").length;
});

const escalatedCount = computed(() => {
  return alerts.value.filter((alert) => alert.status === "escalated").length;
});

const criticalCount = computed(() => {
  return alerts.value.filter((alert) => alert.severity === "critical").length;
});

const filteredAlerts = computed(() => {
  const sorted = [...alerts.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (statusFilter.value === "all") {
    return sorted;
  }

  return sorted.filter((alert) => alert.status === statusFilter.value);
});

/**
 * @param {string} staffId
 * @returns {string}
 */
function getStaffName(staffId) {
  const staff = staffById.value[staffId];
  if (!staff) return t("supervisorAlerts.unknownStaff");
  return `${staff.firstName} ${staff.lastName}`;
}

/**
 * @param {string} staffId
 * @returns {string}
 */
function getStaffArea(staffId) {
  const staff = staffById.value[staffId];
  return staff?.workArea || staff?.area || "—";
}

/**
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  if (!isoDate) return "—";
  return new Date(isoDate).toLocaleString();
}

onMounted(loadData);
</script>

<template>
  <section class="alerts-page">
    <div class="page-header">
      <div>
        <h1>{{ t("supervisorAlerts.title") }}</h1>
        <p>{{ t("supervisorAlerts.subtitle") }}</p>
      </div>
    </div>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="summary-icon teal">
          <i class="pi pi-bell" />
        </div>
        <span>{{ t("supervisorAlerts.total") }}</span>
        <strong>{{ alerts.length }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon warning">
          <i class="pi pi-clock" />
        </div>
        <span>{{ t("supervisorAlerts.pending") }}</span>
        <strong>{{ pendingCount }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon high">
          <i class="pi pi-arrow-up-right" />
        </div>
        <span>{{ t("supervisorAlerts.escalated") }}</span>
        <strong>{{ escalatedCount }}</strong>
      </article>

      <article class="summary-card">
        <div class="summary-icon critical">
          <i class="pi pi-exclamation-circle" />
        </div>
        <span>{{ t("supervisorAlerts.critical") }}</span>
        <strong>{{ criticalCount }}</strong>
      </article>
    </section>

    <section class="table-section">
      <div class="filters-row">
        <select v-model="statusFilter">
          <option value="all">{{ t("supervisorAlerts.filterAll") }}</option>
          <option value="pending">{{ t("supervisorAlerts.filterPending") }}</option>
          <option value="escalated">{{ t("supervisorAlerts.filterEscalated") }}</option>
          <option value="acknowledged">{{ t("supervisorAlerts.filterAcknowledged") }}</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>{{ t("supervisorAlerts.staff") }}</th>
              <th>{{ t("staff.area") }}</th>
              <th>{{ t("supervisorAlerts.type") }}</th>
              <th>{{ t("supervisorAlerts.message") }}</th>
              <th>{{ t("supervisorAlerts.severity") }}</th>
              <th>{{ t("supervisorAlerts.status") }}</th>
              <th>{{ t("supervisorAlerts.createdAt") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="filteredAlerts.length === 0">
              <td colspan="7" class="empty-state">
                {{ t("supervisorAlerts.empty") }}
              </td>
            </tr>

            <tr v-for="alert in filteredAlerts" :key="alert.id">
              <td><strong>{{ getStaffName(alert.medicalStaffId) }}</strong></td>
              <td>{{ getStaffArea(alert.medicalStaffId) }}</td>
              <td>{{ alert.type }}</td>
              <td class="message-cell">{{ alert.message }}</td>
              <td>
                <span class="badge" :class="`severity-${alert.severity}`">
                  {{ t(`staff.${alert.severity}`, alert.severity) }}
                </span>
              </td>
              <td>
                <span class="badge" :class="`status-${alert.status}`">
                  {{ t(`supervisorAlerts.status_${alert.status}`, alert.status) }}
                </span>
              </td>
              <td>{{ formatDate(alert.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style scoped>
.alerts-page {
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

.summary-icon.teal {
  color: #0e7c7b;
}

.summary-icon.warning {
  color: #7a6b00;
}

.summary-icon.high {
  color: #c26a00;
}

.summary-icon.critical {
  color: #c93b3b;
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
  grid-template-columns: 280px;
  gap: 14px;
  margin-bottom: 24px;
}

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
  vertical-align: top;
}

.message-cell {
  max-width: 320px;
  line-height: 1.5;
}

.badge {
  display: inline-flex;
  min-width: 78px;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
}

.severity-moderate {
  background: #fff8d6;
  color: #9a7b00;
}

.severity-high {
  background: #fff0df;
  color: #c26a00;
}

.severity-critical {
  background: #ffe5e5;
  color: #c93b3b;
}

.status-pending {
  background: rgba(69, 221, 229, 0.18);
  color: #087b79;
}

.status-escalated {
  background: #fff0df;
  color: #c26a00;
}

.status-acknowledged {
  background: #e8f8ec;
  color: #23934d;
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
}

@media (max-width: 700px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
