<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();

/**
 * Page title resolved from the current route metadata.
 */
const pageTitle = computed(() => {
  const key = route.meta.titleKey;
  return key ? t(key) : route.meta.title;
});

/**
 * Page description resolved from the current route metadata.
 */
const pageDescription = computed(() => {
  const key = route.meta.descriptionKey;
  return key ? t(key) : t("placeholder.default");
});
</script>

<template>
  <section class="placeholder-page">
    <p class="eyebrow">{{ t("placeholder.section") }}</p>
    <h1>{{ pageTitle }}</h1>
    <p>{{ pageDescription }}</p>

    <div class="placeholder-card">
      <h2>{{ t("placeholder.inProgressTitle") }}</h2>
      <p>{{ t("placeholder.inProgressDescription") }}</p>
    </div>
  </section>
</template>

<style scoped>
.placeholder-page {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--cs-primary, #45dde5);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 16px;
  color: var(--cs-dark, #0e2433);
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

p {
  margin: 0;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 17px;
  line-height: 1.7;
}

.placeholder-card {
  margin-top: 32px;
  padding: 28px;
  border: 1px solid #d8ecec;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(14, 36, 51, 0.06);
}

.placeholder-card h2 {
  margin: 0 0 10px;
  color: var(--cs-dark, #0e2433);
  font-size: 22px;
  font-weight: 800;
}
</style>