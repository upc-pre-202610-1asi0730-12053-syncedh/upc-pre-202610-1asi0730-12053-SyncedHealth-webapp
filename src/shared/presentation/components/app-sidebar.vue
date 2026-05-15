<script setup>
/**
 * App Sidebar Component.
 *
 * Displays the role-based internal navigation menu for CortiSense.
 * The sidebar adapts its options according to the authenticated user's role.
 */

import { computed } from "vue";
import { useRoute } from "vue-router";
import useIamStore from "../../../iam/application/internal/services/iam.store.js";
import LogoutButton from "./logout-button.vue";

const route = useRoute();
const iamStore = useIamStore();

/**
 * Current authenticated user.
 */
const currentUser = computed(() => iamStore.currentUser);

/**
 * Current authenticated user's role.
 */
const currentRole = computed(() => currentUser.value?.role || "");

/**
 * Sidebar menu title according to the authenticated role.
 */
const menuTitle = computed(() => {
  const titles = {
    admin: "Menú administrativo",
    clinical_supervisor: "Menú supervisor",
    medical_staff: "Menú clínico"
  };

  return titles[currentRole.value] || "Menú";
});

/**
 * Role-based menu options.
 */
const menuItems = computed(() => {
  if (currentRole.value === "admin") {
    return [
      { label: "Dashboard", icon: "▦", to: "/admin/dashboard" },
      { label: "Personal médico", icon: "👥", to: "/admin/staff" },
      { label: "Invitaciones", icon: "✉", to: "/admin/invitations", disabled: true },
      { label: "Suscripción", icon: "◈", to: "/admin/subscription", disabled: true },
      { label: "Reportes", icon: "▣", to: "/admin/reports", disabled: true },
      { label: "Auditoría", icon: "☑", to: "/admin/audit", disabled: true },
      { label: "Configuración", icon: "⚙", to: "/admin/settings", disabled: true }
    ];
  }

  if (currentRole.value === "clinical_supervisor") {
    return [
      { label: "Dashboard", icon: "▦", to: "/supervisor/dashboard" },
      { label: "Personal en riesgo", icon: "⚠", to: "/supervisor/risk-staff", disabled: true },
      { label: "Alertas clínicas", icon: "●", to: "/supervisor/alerts", disabled: true },
      { label: "Anomalías", icon: "◇", to: "/supervisor/anomalies", disabled: true },
      { label: "Acciones preventivas", icon: "✓", to: "/supervisor/actions", disabled: true },
      { label: "Configuración", icon: "⚙", to: "/supervisor/settings", disabled: true }
    ];
  }

  return [
    { label: "Resumen IoT", icon: "▦", to: "/medical-staff/status" },
    { label: "Mi cortisol", icon: "◉", to: "/medical-staff/cortisol", disabled: true },
    { label: "Mis turnos", icon: "◷", to: "/medical-staff/shifts", disabled: true },
    { label: "Mi recuperación", icon: "✦", to: "/medical-staff/recovery", disabled: true },
    { label: "Configuración", icon: "⚙", to: "/medical-staff/settings", disabled: true }
  ];
});

/**
 * Checks whether a menu option is active.
 *
 * @param {string} path - Menu option path.
 * @returns {boolean} True when the route starts with the given path.
 */
function isActive(path) {
  return route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <div class="brand-mark">✦</div>
      <div>
        <h1>CortiSense</h1>
        <p>Health Monitoring</p>
      </div>
    </div>

    <div class="user-card" v-if="currentUser">
      <div class="user-avatar">
        {{ currentUser.firstName?.charAt(0) }}{{ currentUser.lastName?.charAt(0) }}
      </div>

      <div>
        <strong>{{ currentUser.firstName }} {{ currentUser.lastName }}</strong>
        <small>{{ currentUser.email }}</small>
      </div>
    </div>

    <nav class="sidebar-nav">
      <span class="menu-label">{{ menuTitle }}</span>

      <template v-for="item in menuItems" :key="item.label">
        <router-link
            v-if="!item.disabled"
            class="nav-item"
            :class="{ active: isActive(item.to) }"
            :to="item.to"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>

        <button v-else class="nav-item disabled" type="button">
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </button>
      </template>
    </nav>

    <div class="sidebar-footer">
      <logout-button />
    </div>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 292px;
  min-height: 100vh;
  background: linear-gradient(180deg, #0e2433 0%, #163142 100%);
  color: #ffffff;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(69, 221, 229, 0.18);
  color: var(--cs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
}

.sidebar-header h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
}

.sidebar-header p {
  margin: 2px 0 0;
  color: #a9c5cc;
  font-size: 12px;
  font-weight: 600;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(153, 255, 246, 0.12);
  margin-bottom: 28px;
}

.user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: var(--cs-primary);
  color: var(--cs-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.user-card strong {
  display: block;
  font-size: 13px;
  font-weight: 800;
}

.user-card small {
  display: block;
  margin-top: 4px;
  color: #a9c5cc;
  font-size: 11px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.menu-label {
  margin: 0 0 8px 8px;
  color: #a9c5cc;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 11px;
  font-weight: 800;
}

.nav-item {
  min-height: 48px;
  border-radius: 14px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #d8eef2;
  background: transparent;
  border: none;
  font-weight: 800;
  cursor: pointer;
  text-align: left;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  background: rgba(69, 221, 229, 0.18);
  color: var(--cs-primary);
}

.nav-item.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.nav-icon {
  width: 22px;
  text-align: center;
}

.sidebar-footer {
  margin-top: 24px;
}
</style>