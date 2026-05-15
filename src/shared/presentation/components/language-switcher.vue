<script setup>
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();

/**
 * Changes the active application locale.
 *
 * @param {string} selectedLocale - Selected locale code.
 * @returns {void}
 */
function changeLanguage(selectedLocale) {
  locale.value = selectedLocale;
  localStorage.setItem("cortisense_locale", selectedLocale);
}
</script>

<template>
  <div class="language-switcher">
    <button
        v-for="availableLocale in availableLocales"
        :key="availableLocale"
        class="language-option"
        :class="{ active: locale === availableLocale }"
        type="button"
        @click="changeLanguage(availableLocale)"
    >
      {{ availableLocale.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  overflow: hidden;
  border-radius: 10px;
  background: #171923;
  box-shadow: 0 14px 28px rgba(14, 36, 51, 0.16);
}

.language-option {
  min-width: 56px;
  border: none;
  padding: 14px 16px;
  background: #171923;
  color: #ffffff;
  font-weight: 800;
  cursor: pointer;
}

.language-option.active {
  background: var(--cs-primary, #45dde5);
  color: var(--cs-dark, #0e2433);
}

.language-option:hover {
  background: var(--cs-primary-medium, #68eae8);
  color: var(--cs-dark, #0e2433);
}
</style>