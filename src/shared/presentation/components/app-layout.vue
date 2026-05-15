<script setup>
/**
 * App Layout Component.
 *
 * Provides the authenticated internal application shell.
 * It contains the sidebar, topbar and nested route content.
 */

import AppSidebar from "./app-sidebar.vue";
import AppTopbar from "./app-topbar.vue";
</script>

<template>
  <div class="app-layout">
    <app-sidebar />

    <section class="layout-content">
      <app-topbar />

      <main class="layout-main">
        <router-view />
      </main>
    </section>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f7fbfc;
}

.layout-content {
  margin-left: 292px;
  min-height: 100vh;
}

.layout-main {
  min-height: calc(100vh - 96px);
}
</style>