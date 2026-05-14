<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCraStore } from '../../application/internal/services/cra.store.js';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

import DeviceLinkCard from '../components/device-link-card.vue';
import DeviceSyncStatusCard from '../components/device-sync-status-card.vue';
import DeviceListCard from '../components/device-list-card.vue';

const { t } = useI18n();

const craStore = useCraStore();
const iamStore = useIamStore();

const currentUser = computed(() => iamStore.currentUser);

const isAdmin = computed(() => currentUser.value?.role === 'admin');
const isDoctor = computed(() => currentUser.value?.role === 'doctor');

const displayedDevices = computed(() => {
  if (isAdmin.value) return craStore.medicalDevices;

  if (isDoctor.value) {
    return craStore.medicalDevices.filter(
        device => String(device.medicalStaffId) === String(currentUser.value?.id)
    );
  }

  return [];
});

const connectedDevices = computed(() => {
  return displayedDevices.value.filter(
      device => device.syncStatus === 'connected'
  );
});

onMounted(async () => {
  await craStore.fetchUsers();
  await craStore.fetchMedicalDevices();
});

const handleLinkDevice = async (device) => {
  const deviceForCurrentDoctor = {
    ...device,
    medicalStaffId: currentUser.value?.id,
  };

  await craStore.linkMedicalDevice(deviceForCurrentDoctor);
  await craStore.fetchMedicalDevices();
};

const handleUpdateStatus = async (deviceId, syncStatus) => {
  await craStore.updateMedicalDeviceStatus(deviceId, syncStatus);
};
</script>

<template>
  <section class="cra-page">
    <header class="hero-card">
      <div>
        <span class="eyebrow">{{ t('cra.common.context') }}</span>
        <h1>{{ t('cra.deviceManagement.title') }}</h1>

        <p v-if="isDoctor">
          {{ t('cra.deviceManagement.doctorDescription') }}
        </p>

        <p v-else>
          {{ t('cra.deviceManagement.adminDescription') }}
        </p>
      </div>

      <div class="hero-icon">
        <i class="pi pi-mobile"></i>
      </div>
    </header>

    <p v-if="craStore.loading" class="loading-message">
      {{ t('cra.common.loadingDevice') }}
    </p>

    <p v-if="craStore.error" class="error-message">
      {{ t('cra.common.deviceError') }}
    </p>

    <!-- Doctor view -->
    <template v-if="isDoctor">
      <div class="device-grid">
        <DeviceLinkCard @link-device="handleLinkDevice" />

        <DeviceSyncStatusCard
            :devices="displayedDevices"
            :get-user-name="craStore.getUserFullNameById"
            :can-manage-status="false"
            @update-status="handleUpdateStatus"
        />
      </div>

      <section class="section-block">
        <DeviceListCard
            :devices="connectedDevices"
            :get-user-name="craStore.getUserFullNameById"
            :can-manage-status="false"
        />
      </section>
    </template>

    <!-- Admin view -->
    <template v-else>
      <div class="admin-grid">
        <DeviceSyncStatusCard
            :devices="displayedDevices"
            :get-user-name="craStore.getUserFullNameById"
            :can-manage-status="isAdmin"
            @update-status="handleUpdateStatus"
        />

        <DeviceListCard
            :devices="connectedDevices"
            :get-user-name="craStore.getUserFullNameById"
            :can-manage-status="false"
        />
      </div>
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

.device-grid {
  display: grid;
  grid-template-columns: minmax(300px, 520px) minmax(300px, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.admin-grid {
  display: grid;
  grid-template-columns: minmax(300px, 480px) 1fr;
  gap: 1.5rem;
  align-items: start;
}

.section-block {
  margin-top: 1.5rem;
}

.loading-message {
  color: #64748b;
}

.error-message {
  color: #dc2626;
}

@media (max-width: 900px) {
  .device-grid,
  .admin-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    align-items: flex-start;
    gap: 1rem;
    flex-direction: column;
  }
}
</style>