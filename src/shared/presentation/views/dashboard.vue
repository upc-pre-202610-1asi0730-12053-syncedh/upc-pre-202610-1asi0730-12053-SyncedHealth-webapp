<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

const { t } = useI18n();
const store = useIamStore();

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
});

const stats = computed(() => {
  if (store.isAdmin) {
    return [
      { icon: 'pi-users',       label: t('dashboard.total_patients'),       value: '1,248', trend: '+12%', up: true  },
      { icon: 'pi-calendar',    label: t('dashboard.today_appointments'),   value: '34',    trend: '+5%',  up: true  },
      { icon: 'pi-chart-line',  label: t('dashboard.pending_reports'),      value: '8',     trend: '-3%',  up: false },
      { icon: 'pi-user-plus',   label: 'New doctors this month',            value: '3',     trend: '+1',   up: true  },
    ];
  }
  return [
    { icon: 'pi-calendar',   label: t('dashboard.today_appointments'),  value: '6',   trend: '2 urgent', up: false },
    { icon: 'pi-users',      label: 'My patients',                      value: '84',  trend: '+2 today', up: true  },
    { icon: 'pi-file-edit',  label: t('dashboard.pending_reports'),     value: '3',   trend: 'Due today', up: false },
    { icon: 'pi-heart',      label: 'Avg satisfaction',                 value: '4.8', trend: '★★★★★',     up: true  },
  ];
});

const appointments = [
  { time: '09:00', name: 'María López',   reason: 'Follow-up',      status: 'confirmed' },
  { time: '10:30', name: 'José Ramírez',  reason: 'New patient',    status: 'pending'   },
  { time: '11:00', name: 'Ana Flores',    reason: 'Lab review',     status: 'confirmed' },
  { time: '14:00', name: 'Luis Torres',   reason: 'Consultation',   status: 'confirmed' },
  { time: '15:30', name: 'Rosa Medina',   reason: 'Post-surgery',   status: 'urgent'    },
];

const activity = [
  { icon: 'pi-user-plus', text: 'New patient registered', time: '2m ago',  color: 'green'  },
  { icon: 'pi-file-edit', text: 'Report #4821 updated',   time: '18m ago', color: 'blue'   },
  { icon: 'pi-calendar',  text: 'Appointment rescheduled', time: '1h ago', color: 'yellow' },
  { icon: 'pi-check',     text: 'Lab results received',   time: '2h ago',  color: 'green'  },
];
</script>

<template>
  <div class="dashboard">
    <div class="dash-header">
      <div>
        <h1>{{ t('dashboard.title') }}</h1>
        <p class="text-muted">Good {{ greeting }}, {{ store.currentUser?.firstName }}
          <span class="role-chip">{{ store.isAdmin ? t('roles.admin') : t('roles.doctor') }}</span>
        </p>
      </div>
    </div>

    <!-- Stats grid -->
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

    <!-- Two column layout -->
    <div class="dash-grid">
      <!-- Appointments -->
      <div class="card-ms">
        <div class="card-title">
          <i class="pi pi-calendar"></i>
          {{ t('dashboard.today_appointments') }}
        </div>
        <div class="appt-list">
          <div v-for="a in appointments" :key="a.time" class="appt-row">
            <span class="appt-time">{{ a.time }}</span>
            <div class="appt-info">
              <strong>{{ a.name }}</strong>
              <span class="appt-reason">{{ a.reason }}</span>
            </div>
            <span :class="['appt-status', `status-${a.status}`]">{{ a.status }}</span>
          </div>
        </div>
      </div>

      <!-- Activity -->
      <div class="card-ms">
        <div class="card-title">
          <i class="pi pi-bolt"></i>
          {{ t('dashboard.recent_activity') }}
        </div>
        <div class="activity-list">
          <div v-for="a in activity" :key="a.text" class="activity-row">
            <div :class="['act-icon', `act-${a.color}`]"><i :class="['pi', a.icon]"></i></div>
            <div class="act-body">
              <span>{{ a.text }}</span>
              <span class="act-time">{{ a.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin-only panel -->
    <div v-if="store.isAdmin" class="card-ms admin-panel">
      <div class="card-title">
        <i class="pi pi-shield"></i>
        Administrator Tools
      </div>
      <div class="admin-tools">
        <div class="admin-tool-btn"><i class="pi pi-users"></i> Manage Users</div>
        <div class="admin-tool-btn"><i class="pi pi-cog"></i> System Settings</div>
        <div class="admin-tool-btn"><i class="pi pi-chart-bar"></i> Analytics</div>
        <div class="admin-tool-btn"><i class="pi pi-server"></i> Audit Logs</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard { padding: 2rem; max-width: 1100px; }

.dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.75rem; }
.dash-header h1 { font-size: 1.5rem; margin-bottom: .25rem; }
.role-chip {
  display: inline-block; margin-left: .5rem;
  padding: .15rem .6rem; background: rgba(13,110,110,.1); color: var(--ms-primary);
  border-radius: 100px; font-size: .72rem; font-weight: 600; vertical-align: middle;
}

/* Stats */
.stats-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;
}
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

/* Dash grid */
.dash-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 1rem; margin-bottom: 1rem; }
@media (max-width: 768px) { .dash-grid { grid-template-columns: 1fr; } }
.card-title { display: flex; align-items: center; gap: .5rem; font-weight: 600; font-size: .92rem; margin-bottom: 1rem; color: var(--ms-text); }
.card-title .pi { color: var(--ms-primary); }

/* Appointments */
.appt-list { display: flex; flex-direction: column; gap: .5rem; }
.appt-row { display: flex; align-items: center; gap: .75rem; padding: .6rem .75rem; border-radius: 8px; background: var(--ms-surface-2); }
.appt-time { font-size: .78rem; font-weight: 700; color: var(--ms-text-muted); width: 40px; flex-shrink: 0; }
.appt-info { flex: 1; display: flex; flex-direction: column; }
.appt-info strong { font-size: .88rem; }
.appt-reason { font-size: .75rem; color: var(--ms-text-muted); }
.appt-status { font-size: .7rem; font-weight: 600; text-transform: uppercase; padding: .2rem .55rem; border-radius: 5px; }
.status-confirmed { background: rgba(61,190,120,.12); color: var(--ms-success); }
.status-pending   { background: rgba(240,165,0,.12);  color: var(--ms-accent); }
.status-urgent    { background: rgba(224,82,82,.12);  color: var(--ms-danger); }

/* Activity */
.activity-list { display: flex; flex-direction: column; gap: .75rem; }
.activity-row { display: flex; align-items: flex-start; gap: .75rem; }
.act-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .85rem; flex-shrink: 0; }
.act-green  { background: rgba(61,190,120,.12); color: var(--ms-success); }
.act-blue   { background: rgba(13,110,110,.12); color: var(--ms-primary); }
.act-yellow { background: rgba(240,165,0,.12);  color: var(--ms-accent); }
.act-body { display: flex; flex-direction: column; }
.act-body span:first-child { font-size: .85rem; }
.act-time { font-size: .75rem; color: var(--ms-text-muted); }

/* Admin panel */
.admin-panel { }
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
