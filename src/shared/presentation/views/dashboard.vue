<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

const { t } = useI18n();
const store = useIamStore();

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return t('dashboard.morning');
  if (h < 18) return t('dashboard.afternoon');
  return t('dashboard.evening');
});

const stats = computed(() => {
  if (store.isAdmin) {
    return [
      { icon: 'pi-users',       label: 'Staff Monitored',       value: '142',   trend: 'Active', up: true  },
      { icon: 'pi-exclamation-triangle', label: 'Critical Alerts', value: '3',     trend: '+1',     up: false },
      { icon: 'pi-clock',       label: 'Active Shifts',         value: '24',    trend: 'Normal', up: true  },
      { icon: 'pi-heart-fill',  label: 'Avg. Stress Index',     value: '42%',   trend: '-5%',    up: true  },
    ];
  }
  return [
    { icon: 'pi-heart',      label: 'Current BPM',              value: '78',    trend: 'Stable', up: true  },
    { icon: 'pi-bolt',       label: 'Stress Level (HRV)',       value: 'Low',   trend: 'Optimal',up: true  },
    { icon: 'pi-moon',       label: 'Sleep Recovery',           value: '84%',   trend: '+10%',   up: true  },
    { icon: 'pi-clock',      label: 'Shift Hours Today',        value: '6.5h',  trend: '1.5h left', up: false },
  ];
});

const shifts = [
  { time: '08:00', type: 'Duty Start',    area: 'Emergency Room',   status: 'completed' },
  { time: '12:00', type: 'Mandatory Rest',area: 'Staff Lounge',     status: 'active'    },
  { time: '14:00', type: 'Consultation',  area: 'Outpatient',       status: 'pending'   },
  { time: '18:00', type: 'Shift End',     area: 'Check-out',        status: 'scheduled' },
];

const biometricAlerts = [
  { icon: 'pi-exclamation-circle', text: 'High Cortisol detected',    time: '5m ago',  color: 'red'    },
  { icon: 'pi-info-circle',        text: 'Hydration reminder',        time: '45m ago', color: 'blue'   },
  { icon: 'pi-check-circle',       text: 'Rest period validated',     time: '2h ago',  color: 'green'  },
  { icon: 'pi-heart',              text: 'Heart rate spike during ICU',time: '4h ago', color: 'yellow' },
];
</script>

<template>
  <div class="dashboard">
    <div class="dash-header">
      <div>
        <h1>{{ t('dashboard.title') || 'Health Monitor Dashboard' }}</h1>
        <p class="text-muted">{{ t('dashboard.welcome', { time: greeting, name: store.currentUser?.firstName }) }}
          <span class="role-chip">{{ store.isAdmin ? t('roles.admin') : t('roles.doctor') }}</span>
        </p>
      </div>
    </div>

    <div class="stats-grid">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="stat-top">
          <div class="stat-icon"><i :class="['pi', s.icon]"></i></div>
          <span :class="['stat-trend', s.up ? 'trend-up' : 'trend-down']">
            <i :class="['pi', s.up ? 'pi-arrow-up' : 'pi-arrow-down']"></i>
            {{ s.trend }}
          </span>
        </div>
        <div class="stat-value">{{ s.value }}</div>
        <div class="stat-label">{{ s.label }}</div>
      </div>
    </div>

    <div class="dash-grid">
      <div class="card-ms">
        <div class="card-title">
          <i class="pi pi-calendar-times"></i>
          {{ t('dashboard.todays_shift_schedule') || 'Todays Shift Schedule' }}
        </div>
        <div class="appt-list">
          <div v-for="s in shifts" :key="s.time" class="appt-row">
            <span class="appt-time">{{ s.time }}</span>
            <div class="appt-info">
              <strong>{{ s.type }}</strong>
              <span class="appt-reason">{{ s.area }}</span>
            </div>
            <span :class="['appt-status', `status-${s.status}`]">{{ s.status }}</span>
          </div>
        </div>
      </div>

      <div class="card-ms">
        <div class="card-title">
          <i class="pi pi-activity"></i>
          {{ t('dashboard.biometric_notifications') || 'Biometric Notifications' }}
        </div>
        <div class="activity-list">
          <div v-for="a in biometricAlerts" :key="a.text" class="activity-row">
            <div :class="['act-icon', `act-${a.color}`]"><i :class="['pi', a.icon]"></i></div>
            <div class="act-body">
              <span>{{ a.text }}</span>
              <span class="act-time">{{ a.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.isAdmin" class="card-ms admin-panel">
      <div class="card-title">
        <i class="pi pi-shield"></i>
        {{ t('dashboard.staff_management_tools') || 'Staff Management Tools' }}
      </div>
      <div class="admin-tools">
        <div class="admin-tool-btn"><i class="pi pi-users"></i> {{ t('dashboard.staff_directory') || 'Staff Directory' }}</div>
        <div class="admin-tool-btn"><i class="pi pi-map"></i> {{ t('dashboard.shift_rotation') || 'Shift Rotation' }}</div>
        <div class="admin-tool-btn"><i class="pi pi-chart-bar"></i> {{ t('dashboard.health_analytics') || 'Health Analytics' }}</div>
        <div class="admin-tool-btn"><i class="pi pi-history"></i> {{ t('dashboard.biometric_logs') || 'Biometric Logs' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard { padding: 2rem; max-width: 1100px; }
.dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.75rem; }
.dash-header h1 { font-size: 1.5rem; margin-bottom: .25rem; font-family: 'DM Serif Display', serif; }
.role-chip {
  display: inline-block; margin-left: .5rem;
  padding: .15rem .6rem; background: rgba(13,110,110,.1); color: var(--ms-primary);
  border-radius: 100px; font-size: .72rem; font-weight: 600; vertical-align: middle;
}

/* Stats */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
@media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }

.stat-card {
  background: var(--ms-surface); border: 1px solid var(--ms-border);
  border-radius: 12px; padding: 1.25rem;
}
.stat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: .75rem; }
.stat-icon { width: 36px; height: 36px; background: rgba(13,110,110,.1); border-radius: 9px; display: flex; align-items: center; justify-content: center; color: var(--ms-primary); font-size: 1rem; }
.stat-trend { font-size: .72rem; font-weight: 600; display: flex; align-items: center; gap: .25rem; }
.trend-up { color: var(--ms-success); }
.trend-down { color: var(--ms-danger); }
.stat-value { font-size: 1.75rem; font-weight: 700; font-family: 'DM Serif Display', serif; color: var(--ms-text); margin-bottom: .2rem; }
.stat-label { font-size: .78rem; color: var(--ms-text-muted); }

/* Grid */
.dash-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 1rem; margin-bottom: 1rem; }
@media (max-width: 768px) { .dash-grid { grid-template-columns: 1fr; } }
.card-ms { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; }
.card-title { display: flex; align-items: center; gap: .5rem; font-weight: 600; font-size: .92rem; margin-bottom: 1rem; }

/* List Rows */
.appt-row { display: flex; align-items: center; gap: .75rem; padding: .6rem .75rem; border-radius: 8px; background: #f8fafc; margin-bottom: .5rem; }
.appt-time { font-size: .78rem; font-weight: 700; color: #64748b; width: 45px; }
.appt-info { flex: 1; display: flex; flex-direction: column; }
.appt-info strong { font-size: .88rem; }
.appt-reason { font-size: .75rem; color: var(--ms-text-muted); }
.appt-status { font-size: .7rem; font-weight: 600; text-transform: uppercase; padding: .2rem .55rem; border-radius: 5px; }

/* Status Colors */
.status-completed { background: #dcfce7; color: #166534; }
.status-active    { background: #dbeafe; color: #1e40af; }
.status-pending   { background: #fef3c7; color: #92400e; }
.status-scheduled { background: #f1f5f9; color: #475569; }

/* Alerts */
.activity-list { display: flex; flex-direction: column; gap: .75rem; }
.activity-row { display: flex; align-items: flex-start; gap: .75rem; margin-bottom: .75rem; }
.act-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.act-green  { background: #dcfce7; color: #166534; }
.act-red    { background: #fee2e2; color: #991b1b; }
.act-blue   { background: #dbeafe; color: #1e40af; }
.act-yellow { background: #fef3c7; color: #92400e; }
.act-body { display: flex; flex-direction: column; font-size: .85rem; }
.act-time { font-size: .75rem; color: #94a3b8; }

/* Admin */
.admin-tools { display: flex; gap: .75rem; flex-wrap: wrap; }
.admin-tool-btn {
  display: flex; align-items: center; gap: .5rem;
  padding: .65rem 1.1rem; border: 1.5px solid var(--ms-border);
  border-radius: 9px; cursor: pointer; font-size: .85rem; font-weight: 500;
  color: var(--ms-text); background: var(--ms-surface-2);
  transition: all .2s;
}
.admin-tool-btn:hover { border-color: var(--ms-primary); color: var(--ms-primary); background: rgba(13,110,110,.05); }
.admin-tool-btn .pi { color: var(--ms-primary); }
</style>