<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emit = defineEmits(['link-device']);

const deviceName = ref('');
const deviceType = ref('wearable');

const formatDateTime = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

const linkDevice = () => {
  if (!deviceName.value.trim()) return;

  const now = new Date();

  emit('link-device', {
    id: `md-${now.getTime()}`,
    medicalStaffId: '2',
    name: deviceName.value,
    type: deviceType.value,
    syncStatus: 'connected',
    lastSyncAt: formatDateTime(now),
  });

  deviceName.value = '';
  deviceType.value = 'wearable';
};
</script>

<template>
  <article class="device-link-card">
    <div class="card-header">
      <div class="icon-box">
        <i class="pi pi-link"></i>
      </div>

      <div>
        <h3>{{ t('cra.deviceManagement.linkDevice') }}</h3>
        <p>{{ t('cra.deviceManagement.linkDeviceDescription') }}</p>
      </div>
    </div>

    <div class="form-group">
      <label for="device-name">
        {{ t('cra.deviceManagement.deviceName') }}
      </label>

      <input
          id="device-name"
          v-model="deviceName"
          type="text"
          :placeholder="t('cra.deviceManagement.deviceNamePlaceholder')"
      />
    </div>

    <div class="form-group">
      <label for="device-type">
        {{ t('cra.deviceManagement.deviceType') }}
      </label>

      <select id="device-type" v-model="deviceType">
        <option value="wearable">
          {{ t('cra.deviceManagement.wearable') }}
        </option>
        <option value="smartwatch">
          {{ t('cra.deviceManagement.smartwatch') }}
        </option>
        <option value="sensor">
          {{ t('cra.deviceManagement.sensor') }}
        </option>
      </select>
    </div>

    <button type="button" :disabled="!deviceName.trim()" @click="linkDevice">
      <i class="pi pi-plus"></i>
      {{ t('cra.deviceManagement.linkDeviceButton') }}
    </button>
  </article>
</template>

<style scoped>
.device-link-card {
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
  background: #e0f2fe;
  color: #0369a1;
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

label {
  color: #475569;
  font-size: 0.9rem;
  font-weight: 600;
}

input,
select {
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  padding: 0.85rem 1rem;
  background: #f8fafc;
  color: #0f172a;
  outline: none;
}

input:focus,
select:focus {
  border-color: #14a8a8;
  background: #ffffff;
}

button {
  margin-top: 0.5rem;
  border: none;
  border-radius: 14px;
  background: #0f766e;
  color: #ffffff;
  padding: 0.9rem 1.1rem;
  cursor: pointer;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 700;
}

button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>