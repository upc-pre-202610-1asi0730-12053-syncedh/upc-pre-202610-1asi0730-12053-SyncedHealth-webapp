<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  devices: {
    type: Array,
    default: () => [],
  },
  getUserName: {
    type: Function,
    required: true,
  },
  canManageStatus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update-status']);

const toggleStatus = (device) => {
  const nextStatus = device.syncStatus === 'connected' ? 'disconnected' : 'connected';
  emit('update-status', device.id, nextStatus);
};
</script>

<template>
  <article class="device-list-card">
    <div class="card-header">
      <div>
        <h3>{{ t('cra.deviceManagement.connectedDevices') }}</h3>
        <p>{{ t('cra.deviceManagement.connectedDevicesDescription') }}</p>
      </div>

      <span class="count-badge">{{ devices.length }}</span>
    </div>

    <div v-if="devices.length" class="device-list">
      <div v-for="device in devices" :key="device.id" class="device-item">
        <div class="device-icon">
          <i class="pi pi-mobile"></i>
        </div>

        <div class="device-info">
          <strong>{{ device.name }}</strong>
          <span>{{ getUserName(device.medicalStaffId) }}</span>
          <small>
            {{ t(`cra.deviceManagement.${device.type}`) }} · {{ device.lastSyncAt }}
          </small>
        </div>

        <div class="device-actions">
          <span class="status-badge" :class="device.syncStatus">
            {{ t(`cra.deviceManagement.${device.syncStatus}`) }}
          </span>

          <button
              v-if="canManageStatus"
              type="button"
              class="status-button"
              :class="device.syncStatus === 'connected' ? 'disconnect' : 'connect'"
              @click="toggleStatus(device)"
          >
            {{ device.syncStatus === 'connected'
              ? t('cra.deviceManagement.disconnect')
              : t('cra.deviceManagement.connect') }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <i class="pi pi-info-circle"></i>
      <span>{{ t('cra.deviceManagement.noLinkedDevices') }}</span>
    </div>
  </article>
</template>

<style scoped>
.device-list-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.card-header h3 {
  margin: 0;
  color: #0f172a;
}

.card-header p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.count-badge {
  background: #ccfbf1;
  color: #0f766e;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  height: fit-content;
  font-weight: 700;
}

.device-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.device-item {
  display: grid;
  grid-template-columns: 44px 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem;
  border-radius: 16px;
  background: #f8fafc;
}

.device-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #e0f2fe;
  color: #0369a1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.device-info strong {
  color: #0f172a;
}

.device-info span {
  color: #334155;
  font-size: 0.9rem;
  font-weight: 600;
}

.device-info small {
  color: #64748b;
  font-size: 0.8rem;
}

.device-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.status-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  text-transform: capitalize;
  font-weight: 700;
}

.connected {
  background: #dcfce7;
  color: #166534;
}

.syncing {
  background: #fef9c3;
  color: #854d0e;
}

.disconnected {
  background: #fee2e2;
  color: #991b1b;
}

.status-button {
  border: none;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

.status-button.disconnect {
  background: #fee2e2;
  color: #991b1b;
}

.status-button.connect {
  background: #dcfce7;
  color: #166534;
}

.empty-state {
  background: #f8fafc;
  color: #64748b;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  gap: 0.6rem;
  align-items: center;
}
</style>