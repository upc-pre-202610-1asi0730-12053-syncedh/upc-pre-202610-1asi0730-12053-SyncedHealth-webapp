<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const collapsed = ref(false);

/**
 * Reads the authenticated user from localStorage.
 *
 * @returns {Object} Current user resource.
 */
function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("cortisense_user")) || {};
  } catch {
    return {};
  }
}

const currentUser = computed(() => getStoredUser());
const userRole = computed(() => currentUser.value?.role || "guest");

const userFullName = computed(() => {
  const firstName = currentUser.value?.firstName || "";
  const lastName = currentUser.value?.lastName || "";
  return `${firstName} ${lastName}`.trim() || "CortiSense User";
});

const userEmail = computed(() => currentUser.value?.email || "user@cortisense.com");

const userInitials = computed(() => {
  const firstName = currentUser.value?.firstName || "";
  const lastName = currentUser.value?.lastName || "";

  if (!firstName && !lastName) return "CS";

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
});

const menuTitle = computed(() => {
  const titles = {
    admin: t("navigation.adminMenu"),
    clinical_supervisor: t("navigation.supervisorMenu"),
    medical_staff: t("navigation.medicalMenu")
  };

  return titles[userRole.value] || t("navigation.menu");
});

/**
 * Role-based sidebar navigation items.
 */
const navigationByRole = {
  admin: [
    { labelKey: "navigation.dashboard", to: "/admin/dashboard", icon: "pi-table" },
    { labelKey: "navigation.staffManagement", to: "/admin/staff/list", icon: "pi-users" },
    { labelKey: "navigation.invitations", to: "/admin/invitations", icon: "pi-envelope" },
    { labelKey: "navigation.subscription", to: "/admin/subscription", icon: "pi-wallet" },
    { labelKey: "navigation.reports", to: "/admin/reports", icon: "pi-chart-bar" },
    { labelKey: "navigation.audit", to: "/admin/audit", icon: "pi-check-square" },
    { labelKey: "navigation.settings", to: "/admin/settings", icon: "pi-cog" }
  ],
  clinical_supervisor: [
    { labelKey: "navigation.dashboard", to: "/supervisor/dashboard", icon: "pi-table" },
    { labelKey: "navigation.riskStaff", to: "/supervisor/risk-staff", icon: "pi-exclamation-triangle" },
    { labelKey: "navigation.clinicalAlerts", to: "/supervisor/alerts", icon: "pi-bell" },
    { labelKey: "navigation.anomalies", to: "/supervisor/anomalies", icon: "pi-heart" },
    { labelKey: "navigation.preventiveActions", to: "/supervisor/preventive-actions", icon: "pi-check" },
    { labelKey: "navigation.settings", to: "/supervisor/settings", icon: "pi-cog" }
  ],
  medical_staff: [
    { labelKey: "navigation.iotSummary", to: "/medical-staff/status", icon: "pi-table" },
    { labelKey: "navigation.myCortisol", to: "/medical-staff/cortisol", icon: "pi-circle" },
    { labelKey: "navigation.myShifts", to: "/medical-staff/shifts", icon: "pi-clock" },
    { labelKey: "navigation.myRecovery", to: "/medical-staff/recovery", icon: "pi-sparkles" },
    { labelKey: "navigation.settings", to: "/medical-staff/settings", icon: "pi-cog" }
  ]
};

const navigationItems = computed(() => navigationByRole[userRole.value] || []);

/**
 * Checks whether the given navigation item is active.
 *
 * @param {Object} item - Navigation item.
 * @returns {boolean} True if the current route matches the item path.
 */
function isActiveRoute(item) {
  return route.path === item.to || route.path.startsWith(`${item.to}/`);
}

/**
 * Clears the session and redirects to sign in.
 *
 * @returns {void}
 */
function signOut() {
  localStorage.removeItem("cortisense_user");
  router.push("/auth/sign-in");
}
</script>

<template>
  <aside :class="['sidebar', { collapsed }]">
    <!-- Logo -->
    <div class="sidebar-logo">
      <span class="logo-icon">✦</span>
      <span v-if="!collapsed" class="logo-text">CortiSense</span>
      <button class="collapse-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expand' : 'Collapse'">
        <i :class="['pi', collapsed ? 'pi-chevron-right' : 'pi-chevron-left']"></i>
      </button>
    </div>

    <!-- User badge -->
    <div v-if="!collapsed" class="sidebar-user">
      <div class="user-avatar">{{ userInitials }}</div>
      <div class="user-info">
        <span class="user-name">{{ userFullName }}</span>
        <span class="user-email">{{ userEmail }}</span>
        <span class="user-role">{{ menuTitle }}</span>
      </div>
    </div>
    <div v-else class="sidebar-user-mini">
      <div class="user-avatar">{{ userInitials }}</div>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in navigationItems" :key="item.to">
          <router-link
              :to="item.to"
              :class="['nav-item', { active: isActiveRoute(item) }]"
              :title="collapsed ? t(item.labelKey) : ''"
          >
            <i :class="['pi', item.icon]"></i>
            <span v-if="!collapsed" class="nav-label">{{ t(item.labelKey) }}</span>
            <span v-if="!collapsed && isActiveRoute(item)" class="active-dot"></span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Bottom actions -->
    <div class="sidebar-bottom">
      <button :class="['nav-item', 'nav-logout']" @click="signOut" :title="collapsed ? t('common.logout') : ''">
        <i class="pi pi-sign-out"></i>
        <span v-if="!collapsed" class="nav-label">{{ t('common.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 304px;
  min-height: 100vh;
  background: linear-gradient(180deg, #0e2433 0%, #123444 100%);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width .25s cubic-bezier(.4,0,.2,1);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.sidebar.collapsed { width: 76px; }

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(153, 255, 246, 0.13);
  gap: .5rem;
}
.logo-icon { font-size: 1.4rem; color: #45dde5; flex-shrink: 0; }
.logo-text { font-size: 1.3rem; font-weight: 800; color: #fff; white-space: nowrap; flex: 1; }

.collapse-btn {
  background: none; border: none; color: rgba(255, 255, 255, 0.55);
  cursor: pointer; padding: .35rem; border-radius: 8px;
  font-size: .8rem; flex-shrink: 0;
  transition: color .2s, background .2s;
}
.collapse-btn:hover { color: #fff; background: rgba(255,255,255,.07); }

/* User badge */
.sidebar-user {
  display: flex; align-items: center; gap: .75rem;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(153, 255, 246, 0.13);
}
.sidebar-user-mini {
  display: flex; justify-content: center;
  padding: 1rem .5rem;
  border-bottom: 1px solid rgba(153, 255, 246, 0.13);
}
.user-avatar {
  width: 46px; height: 46px;
  background: #45dde5;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; font-weight: 800; color: #0e2433;
  flex-shrink: 0;
}
.user-info { display: flex; flex-direction: column; overflow: hidden; }
.user-name { font-size: .95rem; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-email { font-size: .95rem; font-weight: 800; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: .75rem; font-weight: 600; color: rgba(255, 255, 255, 0.65); margin-top: 2px; }

/* Nav */
.sidebar-nav { flex: 1; padding: 1rem .75rem; overflow-y: auto; }
.sidebar-nav ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: .4rem; }

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: .85rem;
  padding: .85rem 1rem;
  border: none;
  border-radius: 15px;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font-family: inherit;
  font-size: .95rem;
  font-weight: 800;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: background .15s, color .15s;
  position: relative;
}
.nav-item .pi { font-size: 1.1rem; flex-shrink: 0; }
.nav-item:hover { background: rgba(69, 221, 229, 0.1); color: #fff; }
.nav-item.active { background: rgba(69, 221, 229, 0.18); color: #45dde5; }
.nav-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.active-dot {
  width: 6px; height: 6px;
  background: #45dde5;
  border-radius: 50%;
  margin-left: auto;
}

/* Bottom */
.sidebar-bottom {
  padding: .75rem .75rem 1.25rem;
  border-top: 1px solid rgba(153, 255, 246, 0.13);
}
.nav-logout { color: rgba(255, 255, 255, 0.7); }
.nav-logout:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
</style>