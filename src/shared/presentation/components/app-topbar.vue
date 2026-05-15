<script setup>
/**
 * App Topbar Component.
 *
 * Displays the page-level top bar for authenticated CortiSense views.
 * It includes a simple greeting and the shared language switcher.
 */

import { computed } from "vue";
import useIamStore from "../../../iam/application/internal/services/iam.store.js";
import LanguageSwitcher from "./language-switcher.vue";

const iamStore = useIamStore();

const currentUser = computed(() => iamStore.currentUser);

/**
 * Greeting text based on the authenticated user.
 */
const greeting = computed(() => {
  if (!currentUser.value) return "Bienvenido";
  return `Bienvenido, ${currentUser.value.firstName}`;
});
</script>

<template>
  <header class="app-topbar">
    <div>
      <h2>{{ greeting }}</h2>
      <p>Monitoreo preventivo y gestión operativa del personal médico.</p>
    </div>

    <language-switcher />
  </header>
</template>

<style scoped>
.app-topbar {
  min-height: 96px;
  background: #ffffff;
  border-bottom: 1px solid #e5eef3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.app-topbar h2 {
  margin: 0 0 6px;
  font-size: 22px;
  color: var(--cs-dark);
  font-weight: 800;
}

.app-topbar p {
  margin: 0;
  color: #61738a;
  font-size: 14px;
  font-weight: 600;
}
</style>