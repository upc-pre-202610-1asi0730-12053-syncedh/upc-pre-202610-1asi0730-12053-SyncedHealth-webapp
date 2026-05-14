<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './language-switcher.vue';
import useIamStore from '../../../iam/application/internal/services/iam.store.js';

const { t } = useI18n();
const store = useIamStore();
</script>

<template>
  <header class="app-header">
    <div class="header-search">
      <i class="pi pi-search search-icon"></i>
      <input type="text" placeholder="Search patients, appointments…" class="search-input" />
    </div>

    <div class="header-right">
      <language-switcher />

      <button class="icon-btn" title="Notifications">
        <i class="pi pi-bell"></i>
        <span class="notif-badge">3</span>
      </button>

      <div class="header-avatar" :title="store.currentUser?.fullName">
        {{ store.currentUser?.firstName?.[0] }}{{ store.currentUser?.lastName?.[0] }}
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 60px;
  background: var(--ms-surface);
  border-bottom: 1px solid var(--ms-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-search {
  position: relative;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: .75rem;
  color: var(--ms-text-muted);
  font-size: .85rem;
}
.search-input {
  padding: .45rem .75rem .45rem 2.25rem;
  border: 1.5px solid var(--ms-border);
  border-radius: 8px;
  font-family: inherit;
  font-size: .85rem;
  width: 260px;
  background: var(--ms-bg);
  color: var(--ms-text);
  outline: none;
  transition: border-color .2s;
}
.search-input:focus { border-color: var(--ms-primary); }
.search-input::placeholder { color: var(--ms-text-muted); }

.header-right {
  display: flex;
  align-items: center;
  gap: .75rem;
}

.icon-btn {
  position: relative;
  width: 36px; height: 36px;
  background: var(--ms-surface-2);
  border: 1px solid var(--ms-border);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  color: var(--ms-text-muted);
  cursor: pointer;
  transition: color .2s, background .2s;
}
.icon-btn:hover { color: var(--ms-primary); background: rgba(13,110,110,.06); }
.notif-badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 16px; height: 16px;
  background: var(--ms-danger);
  color: #fff;
  font-size: .6rem;
  font-weight: 700;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.header-avatar {
  width: 34px; height: 34px;
  background: linear-gradient(135deg, var(--ms-primary-light), var(--ms-primary));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .72rem; font-weight: 700; color: #fff;
  cursor: pointer;
}
</style>
