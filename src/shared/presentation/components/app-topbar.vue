<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "./language-switcher.vue";

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

const firstName = computed(() => currentUser.value?.firstName || "Usuario");
</script>

<template>
  <header class="app-topbar">
    <div>
      <h2>{{ t("layout.welcome", { name: firstName }) }}</h2>
      <p>{{ t("layout.subtitle") }}</p>
    </div>

    <language-switcher />
  </header>
</template>

<style scoped>
.app-topbar {
  height: 96px;
  padding: 0 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #e6eef2;
}

.app-topbar h2 {
  margin: 0;
  color: var(--cs-dark, #0e2433);
  font-size: 24px;
  font-weight: 800;
}

.app-topbar p {
  margin: 6px 0 0;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 15px;
  font-weight: 600;
}
</style>