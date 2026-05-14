<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCraStore } from '../../application/internal/services/cra.store.js';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

import HealthMetricCard from '../components/health-metric-card.vue';
import BiometricHistoryTable from '../components/biometric-history-table.vue';

const { t } = useI18n();

const craStore = useCraStore();
const iamStore = useIamStore();

const currentUser = computed(() => iamStore.currentUser);

const isAdmin = computed(() => currentUser.value?.role === 'admin');
const isDoctor = computed(() => currentUser.value?.role === 'doctor');

const displayedBiometricData = computed(() => {
  if (isAdmin.value) return craStore.biometricData;

  if (isDoctor.value) {
    return craStore.biometricData.filter(
        record => String(record.medicalStaffId) === String(currentUser.value?.id)
    );
  }

  return [];
});

const latestDisplayedBiometricData = computed(() => {
  return displayedBiometricData.value.length > 0
      ? displayedBiometricData.value[displayedBiometricData.value.length - 1]
      : null;
});

onMounted(async () => {
  await craStore.fetchUsers();
  await craStore.fetchMedicalDevices();
  await craStore.fetchBiometricData();
});

const handleGenerateBiometricRecords = async () => {
  await craStore.generateBiometricRecordsForConnectedDevices();
};
</script>

<template>
  <section class="cra-page">
    <header class="hero-card">
      <div>
        <span class="eyebrow">{{ t('cra.common.context') }}</span>

        <h1 v-if="isDoctor">{{ t('cra.biometricMonitoring.doctorTitle') }}</h1>
        <h1 v-else>{{ t('cra.biometricMonitoring.title') }}</h1>

        <p v-if="isDoctor">
          {{ t('cra.biometricMonitoring.doctorDescription') }}
        </p>

        <p v-else>
          {{ t('cra.biometricMonitoring.adminDescription') }}
        </p>
      </div>

      <div class="hero-icon">
        <i class="pi pi-heart"></i>
      </div>
    </header>

    <p v-if="craStore.loading" class="loading-message">
      {{ t('cra.common.loadingBiometric') }}
    </p>

    <p v-if="craStore.error" class="error-message">
      {{ t('cra.common.biometricError') }}
    </p>

    <!-- Doctor view -->
    <template v-if="isDoctor">
      <div v-if="latestDisplayedBiometricData" class="cards-grid">
        <HealthMetricCard
            :title="t('cra.biometricMonitoring.sleep')"
            :value="latestDisplayedBiometricData.sleepHours"
            unit="h"
            icon="pi pi-moon"
        />

        <HealthMetricCard
            :title="t('cra.biometricMonitoring.heartRate')"
            :value="latestDisplayedBiometricData.heartRate"
            unit="bpm"
            icon="pi pi-heart"
        />

        <HealthMetricCard
            :title="t('cra.biometricMonitoring.activity')"
            :value="t(`cra.biometricMonitoring.${latestDisplayedBiometricData.activityLevel}`)"
            icon="pi pi-bolt"
        />
      </div>

      <section v-if="latestDisplayedBiometricData" class="summary-card">
        <div>
          <span class="summary-label">{{ t('cra.biometricMonitoring.latestRecord') }}</span>
          <h2>{{ latestDisplayedBiometricData.recordedAt }}</h2>
          <p>
            {{ t('cra.biometricMonitoring.latestRecordDescription') }}
          </p>
        </div>

        <div class="summary-pill">
          <i class="pi pi-database"></i>
          {{ displayedBiometricData.length }} {{ t('cra.biometricMonitoring.records') }}
        </div>
      </section>

      <section v-else class="empty-card">
        <i class="pi pi-info-circle"></i>
        <div>
          <h3>{{ t('cra.biometricMonitoring.noRecordsTitle') }}</h3>
          <p>
            {{ t('cra.biometricMonitoring.noRecordsDescription') }}
          </p>
        </div>
      </section>

      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>{{ t('cra.biometricMonitoring.myHistory') }}</h2>
            <p>{{ t('cra.biometricMonitoring.myHistoryDescription') }}</p>
          </div>
        </div>

        <BiometricHistoryTable :records="displayedBiometricData" />
      </section>
    </template>

    <!-- Admin view -->
    <template v-else>
      <section class="admin-actions-card">
        <div>
          <span class="summary-label">{{ t('cra.biometricMonitoring.generalHistory') }}</span>
          <h2>
            {{ displayedBiometricData.length }} {{ t('cra.biometricMonitoring.records') }}
          </h2>
          <p>
            {{ t('cra.biometricMonitoring.generalRecordsDescription') }}
          </p>
        </div>

        <button type="button" @click="handleGenerateBiometricRecords">
          <i class="pi pi-refresh"></i>
          {{ t('cra.biometricMonitoring.updateRecords') }}
        </button>
      </section>

      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>{{ t('cra.biometricMonitoring.medicalStaffHistory') }}</h2>
            <p>
              {{ t('cra.biometricMonitoring.medicalStaffHistoryDescription') }}
            </p>
          </div>
        </div>

        <BiometricHistoryTable
            :records="displayedBiometricData"
            :show-user-name="true"
            :get-user-name="craStore.getUserFullNameById"
        />
      </section>
    </template>
  </section>
</template>

<style scoped>
.cra-page {
  padding: 2rem;
}

.hero-card {
  background: linear-gradient(135deg, #0f766e, #14a8a8);
  color: #ffffff;
  border-radius: 26px;
  padding: 2rem;
  margin-bottom: 1.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 18px 45px rgba(20, 168, 168, 0.25);
}

.eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.85;
}

.hero-card h1 {
  margin: 0.4rem 0;
  font-size: 2.1rem;
}

.hero-card p {
  margin: 0;
  opacity: 0.9;
}

.hero-icon {
  width: 72px;
  height: 72px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-icon i {
  font-size: 2rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.summary-card,
.admin-actions-card,
.empty-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
  margin-bottom: 1.5rem;
}

.summary-card,
.admin-actions-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.summary-label {
  color: #14a8a8;
  font-weight: 800;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.summary-card h2,
.admin-actions-card h2,
.empty-card h3 {
  margin: 0.35rem 0;
  color: #0f172a;
}

.summary-card p,
.admin-actions-card p,
.empty-card p {
  margin: 0;
  color: #64748b;
}

.summary-pill {
  background: #ccfbf1;
  color: #0f766e;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  font-weight: 800;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-actions-card button {
  border: none;
  border-radius: 999px;
  background: #0f766e;
  color: #ffffff;
  padding: 0.85rem 1.1rem;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.admin-actions-card button:hover {
  background: #115e59;
}

.empty-card {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.empty-card i {
  color: #14a8a8;
  font-size: 1.8rem;
}

.section-block {
  margin-top: 1.5rem;
}

.section-header {
  margin-bottom: 1rem;
}

.section-header h2 {
  color: #0f172a;
  margin: 0;
}

.section-header p {
  color: #64748b;
  margin: 0.25rem 0 0;
}

.loading-message {
  color: #64748b;
}

.error-message {
  color: #dc2626;
}

@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .summary-card,
  .admin-actions-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero-card {
    align-items: flex-start;
    gap: 1rem;
    flex-direction: column;
  }
}
</style>