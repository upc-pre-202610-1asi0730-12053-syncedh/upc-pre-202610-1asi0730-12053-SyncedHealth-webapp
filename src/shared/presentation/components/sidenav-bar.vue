<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

const { t }  = useI18n();
const router = useRouter();
const route  = useRoute();
const store  = useIamStore();

const collapsed = ref(false);

const allItems = [
  { key: 'dashboard',    label: 'nav.dashboard',    icon: 'pi-th-large',     to: '/dashboard',    roles: ['admin', 'doctor'] },
  { key: 'patients',     label: 'nav.patients',     icon: 'pi-users',        to: '/patients',     roles: ['admin', 'doctor'] },
  { key: 'appointments', label: 'nav.appointments', icon: 'pi-calendar',     to: '/appointments', roles: ['admin', 'doctor'] },
  { key: 'reports',      label: 'nav.reports',      icon: 'pi-chart-bar',    to: '/reports',      roles: ['admin', 'doctor'] },
  { key: 'settings',     label: 'nav.settings',     icon: 'pi-cog',          to: '/settings',     roles: ['admin'] },
];

const menuItems = computed(() =>
    allItems.filter(i => i.roles.includes(store.currentUser?.role))
);

const isActive = (to) => route.path.startsWith(to);

function navigate(to) {
  router.push(to);
}

function logout() {
  store.signOut();
  router.push('/iam/login');
}
</script>

<template>
  <aside :class="['sidebar', { collapsed }]">
    <!-- Logo -->
    <div class="sidebar-logo">
      <span class="logo-icon">✦</span>
      <span v-if="!collapsed" class="logo-text">MediSync</span>
      <button class="collapse-btn" @click="collapsed = !collapsed" :title="collapsed ? 'Expand' : 'Collapse'">
        <i :class="['pi', collapsed ? 'pi-chevron-right' : 'pi-chevron-left']"></i>
      </button>
    </div>

    <!-- User badge -->
    <div v-if="!collapsed" class="sidebar-user">
      <div class="user-avatar">{{ store.currentUser?.firstName?.[0] }}{{ store.currentUser?.lastName?.[0] }}</div>
      <div class="user-info">
        <span class="user-name">{{ store.currentUser?.fullName }}</span>
        <span class="user-role">{{ store.isAdmin ? t('roles.admin') : t('roles.doctor') }}</span>
      </div>
    </div>
    <div v-else class="sidebar-user-mini">
      <div class="user-avatar">{{ store.currentUser?.firstName?.[0] }}</div>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <ul>
        <li v-for="item in menuItems" :key="item.key">
          <button
              :class="['nav-item', { active: isActive(item.to) }]"
              @click="navigate(item.to)"
              :title="collapsed ? t(item.label) : ''"
          >
            <i :class="['pi', item.icon]"></i>
            <span v-if="!collapsed" class="nav-label">{{ t(item.label) }}</span>
            <span v-if="!collapsed && isActive(item.to)" class="active-dot"></span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Bottom actions -->
    <div class="sidebar-bottom">
      <button :class="['nav-item', 'nav-logout']" @click="logout" :title="collapsed ? t('nav.logout') : ''">
        <i class="pi pi-sign-out"></i>
        <span v-if="!collapsed">{{ t('nav.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--ms-sidebar-w);
  min-height: 100vh;
  background: var(--ms-sidebar-bg);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width .25s cubic-bezier(.4,0,.2,1);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.sidebar.collapsed { width: 68px; }

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
  gap: .5rem;
}
.logo-icon { font-size: 1.4rem; color: var(--ms-primary-light); flex-shrink: 0; }
.logo-text { font-family: 'DM Serif Display', serif; font-size: 1.15rem; color: #fff; white-space: nowrap; flex: 1; }

.collapse-btn {
  background: none; border: none; color: var(--ms-sidebar-text);
  cursor: pointer; padding: .25rem; border-radius: 5px;
  font-size: .8rem; flex-shrink: 0;
  transition: color .2s, background .2s;
}
.collapse-btn:hover { color: #fff; background: rgba(255,255,255,.07); }

/* User badge */
.sidebar-user {
  display: flex; align-items: center; gap: .75rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sidebar-user-mini {
  display: flex; justify-content: center;
  padding: .75rem .5rem;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.user-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--ms-primary-light), var(--ms-primary));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.user-info { display: flex; flex-direction: column; overflow: hidden; }
.user-name { font-size: .84rem; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: .7rem; color: var(--ms-sidebar-text); }

/* Nav */
.sidebar-nav { flex: 1; padding: .75rem .5rem; overflow-y: auto; }
.sidebar-nav ul { list-style: none; display: flex; flex-direction: column; gap: .25rem; }

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: .75rem;
  padding: .65rem .75rem;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: var(--ms-sidebar-text);
  font-family: inherit;
  font-size: .88rem;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background .15s, color .15s;
  position: relative;
}
.nav-item .pi { font-size: 1rem; flex-shrink: 0; }
.nav-item:hover { background: var(--ms-sidebar-hover); color: #fff; }
.nav-item.active { background: rgba(20,168,168,.15); color: var(--ms-primary-light); }
.nav-label { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.active-dot {
  width: 6px; height: 6px;
  background: var(--ms-primary-light);
  border-radius: 50%;
}

/* Bottom */
.sidebar-bottom {
  padding: .5rem .5rem 1rem;
  border-top: 1px solid rgba(255,255,255,.06);
}
.nav-logout { color: rgba(224,82,82,.75); }
.nav-logout:hover { background: rgba(224,82,82,.1); color: var(--ms-danger); }
</style>
