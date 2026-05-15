<script setup>
import { useRouter } from 'vue-router';
import { useI18n }   from 'vue-i18n';
const { t }  = useI18n();
const router = useRouter();
</script>

<template>
  <div class="result-page">
    <div class="result-card result-card--cancel">
      <div class="result-icon"><i class="pi pi-times-circle"></i></div>
      <h1>{{ t('billing.cancel_title') }}</h1>
      <p class="text-muted">{{ t('billing.cancel_desc') }}</p>
      <button class="btn-ghost" @click="router.push({ name: 'billing-plans' })">
        <i class="pi pi-arrow-left"></i> Back to Plans
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-page { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 60px); padding: 2rem; }
.result-card { text-align: center; max-width: 380px; background: var(--ms-surface); border: 1px solid var(--ms-border); border-radius: 16px; padding: 2.5rem 2rem; }
.result-icon { font-size: 3rem; margin-bottom: 1rem; }
.result-card--cancel .result-icon { color: #e05252; }
h1 { font-size: 1.4rem; margin-bottom: .5rem; }
.text-muted { margin-bottom: 1.75rem; font-size: .9rem; }
.btn-ghost { display: inline-flex; align-items: center; gap: .5rem; padding: .7rem 1.5rem; border: 1.5px solid var(--ms-border); border-radius: 8px; background: transparent; font-family: inherit; font-size: .9rem; font-weight: 600; cursor: pointer; transition: border-color .2s; }
.btn-ghost:hover { border-color: var(--ms-primary, #0d6e6e); color: var(--ms-primary, #0d6e6e); }
</style>
