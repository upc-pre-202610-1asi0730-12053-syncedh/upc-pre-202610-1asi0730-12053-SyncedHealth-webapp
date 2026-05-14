<script setup>
import SidebarNav from './sidenav-bar.vue';
import AppHeader from './app-header.vue';
</script>

<template>
  <div class="app-shell">
    <SidebarNav />

    <div class="app-main">
      <AppHeader />

      <div class="app-content">
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.name" />
        </RouterView>
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