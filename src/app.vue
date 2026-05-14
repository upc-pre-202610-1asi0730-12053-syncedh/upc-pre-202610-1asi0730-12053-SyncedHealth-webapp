<script setup>
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import useIamStore from './iam/application/internal/services/iam.store.js';

const { t } = useI18n();
const store = useIamStore();

// Restore session from localStorage on app boot
onMounted(() => {
  store.restoreSession();
});
</script>

<template>
  <router-view />
</template>
