<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  records: {
    type: Array,
    default: () => [],
  },
  showUserName: {
    type: Boolean,
    default: false,
  },
  getUserName: {
    type: Function,
    default: () => 'Medical staff',
  },
});

const parseRecordedAt = (value) => {
  if (!value) return 0;

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return new Date(value.replace(' ', 'T')).getTime();
  }

  const match = value.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(a\.?\s*m\.?|p\.?\s*m\.?)?$/i
  );

  if (match) {
    const day = Number(match[1]);
    const month = Number(match[2]) - 1;
    const year = Number(match[3]);
    let hour = Number(match[4]);
    const minute = Number(match[5]);
    const second = Number(match[6] || 0);
    const meridiem = match[7]?.toLowerCase() || '';

    if (meridiem.includes('p') && hour < 12) hour += 12;
    if (meridiem.includes('a') && hour === 12) hour = 0;

    return new Date(year, month, day, hour, minute, second).getTime();
  }

  return new Date(value).getTime() || 0;
};

const formatRecordedAt = (value) => {
  const timestamp = parseRecordedAt(value);

  if (!timestamp) return value;

  const date = new Date(timestamp);

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

const sortedRecords = computed(() => {
  return [...props.records].sort((a, b) => {
    return parseRecordedAt(b.recordedAt) - parseRecordedAt(a.recordedAt);
  });
});
</script>

<template>
  <div class="history-table">
    <table>
      <thead>
      <tr>
        <th v-if="showUserName">
          {{ t('cra.biometricMonitoring.medicalStaff') }}
        </th>
        <th>{{ t('cra.biometricMonitoring.date') }}</th>
        <th>{{ t('cra.biometricMonitoring.heartRate') }}</th>
        <th>{{ t('cra.biometricMonitoring.sleepColumn') }}</th>
        <th>{{ t('cra.biometricMonitoring.activityColumn') }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="record in sortedRecords" :key="record.id">
        <td v-if="showUserName">
          {{ getUserName(record.medicalStaffId) }}
        </td>

        <td>
          {{ formatRecordedAt(record.recordedAt) }}
        </td>

        <td>
          {{ record.heartRate }} bpm
        </td>

        <td>
          {{ record.sleepHours }} h
        </td>

        <td>
          <span class="activity-badge" :class="record.activityLevel">
            {{ t(`cra.biometricMonitoring.${record.activityLevel}`) }}
          </span>
        </td>
      </tr>

      <tr v-if="sortedRecords.length === 0">
        <td :colspan="showUserName ? 5 : 4" class="empty-message">
          {{ t('cra.biometricMonitoring.noHistory') }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.history-table {
  background: #ffffff;
  border-radius: 22px;
  padding: 1rem;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.08);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 0.95rem;
  border-bottom: 1px solid #e2e8f0;
}

th {
  color: #475569;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

td {
  color: #0f172a;
  font-size: 0.92rem;
}

.empty-message {
  text-align: center;
  color: #64748b;
}

.activity-badge {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.8rem;
  text-transform: capitalize;
  font-weight: 700;
}

.low {
  background: #e0f2fe;
  color: #0369a1;
}

.moderate {
  background: #dcfce7;
  color: #166534;
}

.high {
  background: #fef9c3;
  color: #854d0e;
}
</style>