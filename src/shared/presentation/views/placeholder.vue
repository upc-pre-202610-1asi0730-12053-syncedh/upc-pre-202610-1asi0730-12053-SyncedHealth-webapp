<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const meta = route.meta.placeholder || { icon: 'pi-box', label: 'Coming Soon' };
</script>

<template>
  <div class="placeholder-page">
    <div class="ph-inner">
      <div class="ph-icon"><i :class="['pi', meta.icon]"></i></div>
      <h2>{{ meta.label }}</h2>
      <p class="text-muted">This section is being developed by another team member.<br/>Check back soon.</p>
      <div class="ph-badge">
        <i class="pi pi-hammer"></i> In development
      </div>
    </div>
  </div>
</template>

<style scoped>
.placeholder-page {
  display: flex; align-items: center; justify-content: center;
  min-height: calc(100vh - 60px);
  padding: 2rem;
}
.ph-inner { text-align: center; max-width: 360px; }
.ph-icon {
  width: 72px; height: 72px;
  background: rgba(13,110,110,.08);
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem; color: var(--ms-primary);
  margin: 0 auto 1.25rem;
}
h2 { font-size: 1.3rem; margin-bottom: .5rem; }
.text-muted { margin-bottom: 1.25rem; font-size: .9rem; line-height: 1.65; }
.ph-badge {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .4rem 1rem;
  background: rgba(240,165,0,.1); color: var(--ms-accent);
  border: 1px solid rgba(240,165,0,.25); border-radius: 100px;
  font-size: .78rem; font-weight: 600;
}
</style>
