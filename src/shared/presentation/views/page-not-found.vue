<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const path = router.currentRoute.value.fullPath;
</script>

<template>
  <div class="notfound">
    <div class="notfound-inner">
      <div class="notfound-num">404</div>
      <h1>{{ t('errors.not_found') }}</h1>
      <p class="text-muted">{{ t('errors.not_found_desc', { path }) }}</p>
      <button class="ms-btn" @click="router.push('/')">
        <i class="pi pi-home"></i> {{ t('errors.go_home') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  min-height: 100%;
  display: flex; align-items: center; justify-content: center; padding: 3rem;
}
.notfound-inner { text-align: center; max-width: 400px; }
.notfound-num {
  font-family: 'DM Serif Display', serif;
  font-size: 6rem;
  line-height: 1;
  color: var(--ms-border);
  margin-bottom: .5rem;
}
h1 { font-size: 1.4rem; margin-bottom: .5rem; }
.text-muted { margin-bottom: 1.75rem; font-size: .9rem; }
.ms-btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .65rem 1.5rem;
  background: var(--ms-primary); color: #fff; border: none;
  border-radius: 8px; font-family: inherit; font-size: .9rem;
  font-weight: 600; cursor: pointer; transition: background .2s;
}
.ms-btn:hover { background: var(--ms-primary-dark); }
</style>
