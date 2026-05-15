<script setup>
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

/**
 * Navigates back to the medical staff list.
 *
 * @returns {void}
 */
function goBack() {
  router.push("/admin/staff/list");
}
</script>

<template>
  <section class="detail-page">
    <p class="eyebrow">{{ t("staff.section") }}</p>
    <h1>{{ t("staff.detailTitle") }}</h1>
    <p>{{ t("staff.detail.professionalInformation") }}</p>

    <div class="detail-card">
      <h2>ID: {{ route.params.id }}</h2>
      <p>{{ t("placeholder.inProgressDescription") }}</p>

      <button type="button" @click="goBack">
        {{ t("staff.back") }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.detail-page {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--cs-primary, #45dde5);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 8px;
  color: var(--cs-dark, #0e2433);
  font-size: 34px;
  font-weight: 800;
}

p {
  margin: 0 0 24px;
  color: var(--cs-gray-dark, #4f555a);
  font-size: 16px;
}

.detail-card {
  padding: 24px;
  border: 1px solid #d8ecec;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(14, 36, 51, 0.05);
}

button {
  min-height: 44px;
  margin-top: 20px;
  padding: 0 22px;
  border: none;
  border-radius: 12px;
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
  font-weight: 800;
  cursor: pointer;
}
</style>