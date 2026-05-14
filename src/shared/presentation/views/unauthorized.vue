<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <div class="unauth-page">
    <div class="unauth-card">
      <div class="unauth-icon"><i class="pi pi-lock"></i></div>
      <h1>{{ t('errors.unauthorized') }}</h1>
      <p class="text-muted">{{ t('errors.unauthorized_desc') }}</p>
      <button class="ms-btn" @click="router.push('/dashboard')">
        <i class="pi pi-arrow-left"></i> {{ t('common.back') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.unauth-page {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
.unauth-card {
  text-align: center;
  max-width: 360px;
}
.unauth-icon {
  width: 72px; height: 72px;
  background: rgba(224,82,82,.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.75rem;
  color: var(--ms-danger);
  margin: 0 auto 1.5rem;
}
h1 { font-size: 1.4rem; margin-bottom: .5rem; }
.text-muted { margin-bottom: 1.75rem; }
.ms-btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .65rem 1.5rem;
  background: var(--ms-primary); color: #fff; border: none;
  border-radius: 8px; font-family: inherit; font-size: .9rem;
  font-weight: 600; cursor: pointer;
  transition: background .2s;
}
.ms-btn:hover { background: var(--ms-primary-dark); }
</style>
