<script setup>
import SidebarNav from './sidebar-nav.vue';
import AppHeader from './app-header.vue';
</script>

<template>
  <div class="app-shell">
    <sidebar-nav />
    <div class="app-main">
      <app-header />
      <div class="app-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--ms-bg);
}

.app-content {
  flex: 1;
  overflow-y: auto;
}
</style>
