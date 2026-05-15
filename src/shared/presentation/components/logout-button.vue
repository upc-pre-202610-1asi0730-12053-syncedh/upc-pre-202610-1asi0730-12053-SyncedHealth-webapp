<script setup>
/**
 * Logout Button Component.
 *
 * Provides a reusable sign-out action for authenticated layouts.
 * It clears the current IAM session and redirects the user to sign-in.
 */

import { useRouter } from "vue-router";
import useIamStore from "../../../iam/application/iam.store.js";

const router = useRouter();
const iamStore = useIamStore();

/**
 * Signs out the current user and redirects to sign-in.
 *
 * @returns {void}
 */
function onLogout() {
  iamStore.signOut();
  router.push("/sign-in");
}
</script>

<template>
  <button class="logout-button" type="button" @click="onLogout">
    <span class="logout-icon">⎋</span>
    <span>Cerrar sesión</span>
  </button>
</template>

<style scoped>
.logout-button {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  cursor: pointer;
  transition: 0.2s ease;
}

.logout-button:hover {
  background: rgba(69, 221, 229, 0.18);
  color: var(--cs-primary);
}

.logout-icon {
  font-size: 18px;
}
</style>