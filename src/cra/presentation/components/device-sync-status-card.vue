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
  <article class="sync-card">
    <div class="card-header">
      <div class="icon-box">
        <i class="pi pi-sync"></i>
      </div>

      <div>
        <h3>{{ t('cra.deviceManagement.syncStatus') }}</h3>
        <p>{{ t('cra.deviceManagement.syncStatusDescription') }}</p>
      </div>
    </div>

    <div v-if="devices.length" class="sync-list">
      <div v-for="device in devices" :key="device.id" class="sync-row">
        <div class="sync-info">
          <strong>{{ device.name }}</strong>
          <span>{{ getUserName(device.medicalStaffId) }}</span>
          <small>
            {{ t('cra.deviceManagement.lastUpdate') }}: {{ device.lastSyncAt }}
          </small>
        </div>

        <div class="sync-actions">
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
      <span>{{ t('cra.deviceManagement.noLinkedDevice') }}</span>
    </div>
  </article>
</template>

<style scoped>
.sync-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #dcfce7;
  color: #15803d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box i {
  font-size: 1.35rem;
}

h3 {
  margin: 0;
  color: #0f172a;
}

p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.9rem;
}

.sync-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sync-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #f8fafc;
  padding: 0.85rem 1rem;
  border-radius: 14px;
}

.sync-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.sync-info strong {
  color: #0f172a;
}

.sync-info span {
  color: #64748b;
  font-size: 0.85rem;
}

.sync-info small {
  color: #94a3b8;
  font-size: 0.75rem;
}

.sync-actions {
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
  color: #166534 !important;
}

.syncing {
  background: #fef9c3;
  color: #854d0e !important;
}

.disconnected {
  background: #fee2e2;
  color: #991b1b !important;
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