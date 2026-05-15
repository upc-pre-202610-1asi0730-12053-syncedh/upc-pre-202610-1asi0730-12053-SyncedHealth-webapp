<script setup>
import AppSidebar from "./app-sidebar.vue";
import AppTopbar from "./app-topbar.vue";
</script>

<template>
  <div class="app-layout">
    <app-sidebar />

    <main class="app-main">
      <app-topbar />

      <section class="app-content">
        <slot />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 304px 1fr;
  background: var(--cs-background, #edfffb);
}

.app-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f7fbfc;
}

.app-content {
  flex: 1;
  padding: 48px 56px;
}

@media (max-width: 900px) {
  .app-layout {
    grid-template-columns: 1fr;
  }

  .app-content {
    padding: 32px 24px;
  }
}
</style>