<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="dashboard-page">
    <h1>{{ t("dashboard.admin.title") }}</h1>
    <p>{{ t("dashboard.admin.subtitle") }}</p>
  </section>
</template>

<style scoped>
.dashboard-page h1 {
  margin: 0 0 16px;
  color: var(--cs-dark, #0e2433);
  font-size: 36px;
  font-weight: 800;
}

.dashboard-page p {
  margin: 0;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 17px;
}
</style>