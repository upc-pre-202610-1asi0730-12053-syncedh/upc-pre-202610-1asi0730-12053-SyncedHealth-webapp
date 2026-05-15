<script setup>
import { onMounted }  from 'vue';
import { useRouter }  from 'vue-router';
import { useI18n }    from 'vue-i18n';
import useIamStore     from '../../../iam/application/internal/services/iam.store.js';
import useBillingStore from '../../application/internal/services/billing.store.js';

const { t }        = useI18n();
const router       = useRouter();
const iamStore     = useIamStore();
const billingStore = useBillingStore();

onMounted(() => {
  // Refetch subscription so the UI reflects the newly activated plan
  if (iamStore.currentUser?.id) {
    billingStore.fetchSubscription(iamStore.currentUser.id);
  }
});
</script>

<template>
  <div class="result-page">
    <div class="result-card result-card--success">
      <div class="result-icon"><i class="pi pi-check-circle"></i></div>
      <h1>{{ t('billing.success_title') }}</h1>
      <p class="text-muted">{{ t('billing.success_desc') }}</p>
      <button class="btn-primary" @click="router.push({ name: 'dashboard' })">
        <i class="pi pi-th-large"></i> Go to Dashboard
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-page { display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 60px); padding: 2rem; }
.result-card { text-align: center; max-width: 380px; background: var(--ms-surface); border: 1px solid var(--ms-border); border-radius: 16px; padding: 2.5rem 2rem; }
.result-icon { font-size: 3rem; margin-bottom: 1rem; }
.result-card--success .result-icon { color: #3dbe78; }
h1 { font-size: 1.4rem; margin-bottom: .5rem; }
.text-muted { margin-bottom: 1.75rem; font-size: .9rem; }
.btn-primary { display: inline-flex; align-items: center; gap: .5rem; padding: .7rem 1.5rem; background: var(--ms-primary, #0d6e6e); color: #fff; border: none; border-radius: 8px; font-family: inherit; font-size: .9rem; font-weight: 600; cursor: pointer; transition: background .2s; }
.btn-primary:hover { filter: brightness(1.1); }
</style>
