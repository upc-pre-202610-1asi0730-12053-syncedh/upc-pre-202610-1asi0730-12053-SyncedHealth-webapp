<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

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
    { labelKey: "navigation.dashboard", to: "/admin/dashboard", icon: "pi pi-table" },
    { labelKey: "navigation.staffManagement", to: "/admin/staff/list", icon: "pi pi-users" },
    { labelKey: "navigation.invitations", to: "/admin/invitations", icon: "pi pi-envelope" },
    { labelKey: "navigation.subscription", to: "/admin/subscription", icon: "pi pi-wallet" },
    { labelKey: "navigation.reports", to: "/admin/reports", icon: "pi pi-chart-bar" },
    { labelKey: "navigation.audit", to: "/admin/audit", icon: "pi pi-check-square" },
    { labelKey: "navigation.settings", to: "/admin/settings", icon: "pi pi-cog" }
  ],
  clinical_supervisor: [
    { labelKey: "navigation.dashboard", to: "/supervisor/dashboard", icon: "pi pi-table" },
    { labelKey: "navigation.riskStaff", to: "/supervisor/risk-staff", icon: "pi pi-exclamation-triangle" },
    { labelKey: "navigation.clinicalAlerts", to: "/supervisor/alerts", icon: "pi pi-bell" },
    { labelKey: "navigation.anomalies", to: "/supervisor/anomalies", icon: "pi pi-heart" },
    { labelKey: "navigation.preventiveActions", to: "/supervisor/preventive-actions", icon: "pi pi-check" },
    { labelKey: "navigation.settings", to: "/supervisor/settings", icon: "pi pi-cog" }
  ],
  medical_staff: [
    { labelKey: "navigation.iotSummary", to: "/medical-staff/status", icon: "pi pi-table" },
    { labelKey: "navigation.myCortisol", to: "/medical-staff/cortisol", icon: "pi pi-circle" },
    { labelKey: "navigation.myShifts", to: "/medical-staff/shifts", icon: "pi pi-clock" },
    { labelKey: "navigation.myRecovery", to: "/medical-staff/recovery", icon: "pi pi-sparkles" },
    { labelKey: "navigation.settings", to: "/medical-staff/settings", icon: "pi pi-cog" }
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
  <aside class="app-sidebar">
    <section class="brand-section">
      <router-link class="brand" to="/">
        <span class="brand-symbol">✦</span>
        <span>
          <strong>CortiSense</strong>
          <small>Health Monitoring</small>
        </span>
      </router-link>
    </section>

    <section class="user-card">
      <div class="user-avatar">
        {{ userInitials }}
      </div>

      <div class="user-info">
        <strong>{{ userFullName }}</strong>
        <span>{{ userEmail }}</span>
      </div>
    </section>

    <p class="menu-title">{{ menuTitle }}</p>

    <nav class="navigation" aria-label="Main navigation">
      <router-link
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="navigation-item"
          :class="{ active: isActiveRoute(item) }"
      >
        <i :class="item.icon" />
        <span>{{ t(item.labelKey) }}</span>
      </router-link>
    </nav>

    <section class="sidebar-footer">
      <button class="logout-button" type="button" @click="signOut">
        <i class="pi pi-sign-out" />
        <span>{{ t("common.logout") }}</span>
      </button>
    </section>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 304px;
  min-height: 100vh;
  background: linear-gradient(180deg, #0e2433 0%, #123444 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 28px 20px;
}

.brand-section {
  margin-bottom: 32px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #ffffff;
  text-decoration: none;
}

.brand-symbol {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(69, 221, 229, 0.15);
  color: var(--cs-primary, #45dde5);
  font-size: 22px;
}

.brand strong {
  display: block;
  font-size: 25px;
  font-weight: 800;
  line-height: 1;
}

.brand small {
  display: block;
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 700;
}

.user-card {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-bottom: 28px;
  border: 1px solid rgba(153, 255, 246, 0.13);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
}

.user-avatar {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
  font-weight: 800;
}

.user-info {
  min-width: 0;
}

.user-info strong {
  display: block;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info span {
  display: block;
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-title {
  margin: 0 8px 14px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.navigation-item {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 50px;
  padding: 0 18px;
  border-radius: 15px;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  font-size: 15px;
  font-weight: 800;
  transition: all 0.2s ease;
}

.navigation-item i {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.navigation-item:hover {
  background: rgba(69, 221, 229, 0.1);
  color: #ffffff;
}

.navigation-item.active {
  background: rgba(69, 221, 229, 0.18);
  color: var(--cs-primary, #45dde5);
}

.navigation-item.active i {
  color: var(--cs-primary, #45dde5);
}

.sidebar-footer {
  margin-top: auto;
}

.logout-button {
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 22px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
}

.logout-button:hover {
  background: rgba(69, 221, 229, 0.14);
}
</style>