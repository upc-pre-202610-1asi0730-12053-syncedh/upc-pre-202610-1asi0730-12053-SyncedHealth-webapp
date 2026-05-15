<script setup>
/**
 * Language Switcher Component.
 *
 * Provides a reusable language selector for public authentication views and
 * authenticated layouts.
 */

import { useI18n } from 'vue-i18n';

const { locale, availableLocales } = useI18n();

/**
 * Changes the active application language.
 *
 * @param {string} language - Locale code selected by the user.
 * @returns {void}
 */
function changeLanguage(language) {
  locale.value = language;
}
</script>

<template>
  <div class="language-switch" aria-label="Language selector">
    <button
        v-for="language in availableLocales"
        :key="language"
        type="button"
        :class="{ active: locale === language }"
        @click="changeLanguage(language)"
    >
      {{ language.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.language-switch {
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.language-switch button {
  border: none;
  padding: 14px 18px;
  background: #1f222b;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.language-switch button.active {
  background: var(--cs-primary);
  color: var(--cs-dark);
}

.language-switch button:hover {
  background: var(--cs-primary-strong);
  color: var(--cs-dark);
}
</style>