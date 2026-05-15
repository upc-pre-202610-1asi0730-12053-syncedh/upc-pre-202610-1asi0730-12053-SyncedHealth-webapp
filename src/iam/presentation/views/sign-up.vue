<script setup>
/**
 * Complete Registration View.
 *
 * Lets invited users complete their institutional account. The assigned role is
 * resolved from the pending invitation stored in the mock API.
 */

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import LanguageSwitcher from '../../../shared/presentation/components/language-switcher.vue';
import useIamStore from '../../application/iam.store.js';
import { CompleteRegistrationCommand } from '../../domain/commands/complete-registration.command.js';

const router = useRouter();
const iamStore = useIamStore();
const { t } = useI18n();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  area: '',
  specialty: '',
  password: '',
  confirmPassword: ''
});

const errorMessage = ref('');

/**
 * Converts domain errors into localized user-facing messages.
 *
 * @param {Error} error - Domain or infrastructure error.
 * @returns {string} Localized error message.
 */
function resolveErrorMessage(error) {
  if (error.message === 'Invitation not found') return t('auth.invitationNotFound');
  if (error.message === 'Passwords do not match') return t('auth.passwordsDoNotMatch');
  return error.message;
}

/**
 * Handles account completion form submission.
 *
 * @returns {Promise<void>}
 */
async function onSubmit() {
  errorMessage.value = '';

  try {
    await iamStore.completeRegistration(
        new CompleteRegistrationCommand(form.value)
    );

    router.push('/sign-in');
  } catch (error) {
    errorMessage.value = resolveErrorMessage(error);
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-brand">
      <div class="brand-content">
        <div class="brand-logo">
          <span class="brand-mark">✦</span>
          <span>CortiSense</span>
        </div>

        <h1>{{ t('auth.registerHeroTitle') }}</h1>

        <p>{{ t('auth.registerHeroText') }}</p>

        <div class="demo-card">
          <h3>{{ t('auth.invitedEmails') }}</h3>
          <p>nuevo.medico@cortisense.com</p>
          <p>nuevo.supervisor@cortisense.com</p>
        </div>
      </div>
    </section>

    <section class="auth-form-section">
      <div class="language-switch-wrapper">
        <language-switcher />
      </div>

      <form class="auth-form" @submit.prevent="onSubmit">
        <h2>{{ t('auth.createAccount') }}</h2>
        <p class="subtitle">{{ t('auth.createSubtitle') }}</p>

        <div class="form-grid">
          <label>
            {{ t('auth.firstName') }}
            <input
                v-model="form.firstName"
                type="text"
                :placeholder="t('auth.firstName')"
                autocomplete="given-name"
                required
            />
          </label>

          <label>
            {{ t('auth.lastName') }}
            <input
                v-model="form.lastName"
                type="text"
                :placeholder="t('auth.lastName')"
                autocomplete="family-name"
                required
            />
          </label>
        </div>

        <label>
          {{ t('auth.email') }}
          <input
              v-model="form.email"
              type="email"
              :placeholder="t('auth.email')"
              autocomplete="email"
              required
          />
        </label>

        <div class="form-grid">
          <label>
            {{ t('auth.phone') }}
            <input
                v-model="form.phone"
                type="text"
                :placeholder="t('auth.phone')"
                autocomplete="tel"
                required
            />
          </label>

          <label>
            {{ t('auth.area') }}
            <input
                v-model="form.area"
                type="text"
                :placeholder="t('auth.areaPlaceholder')"
                required
            />
          </label>
        </div>

        <label>
          {{ t('auth.specialty') }}
          <input
              v-model="form.specialty"
              type="text"
              :placeholder="t('auth.specialtyPlaceholder')"
              required
          />
        </label>

        <label>
          {{ t('auth.password') }}
          <input
              v-model="form.password"
              type="password"
              :placeholder="t('auth.password')"
              autocomplete="new-password"
              required
          />
        </label>

        <label>
          {{ t('auth.confirmPassword') }}
          <input
              v-model="form.confirmPassword"
              type="password"
              :placeholder="t('auth.confirmPassword')"
              autocomplete="new-password"
              required
          />
        </label>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button class="primary-button" type="submit" :disabled="iamStore.loading">
          {{ iamStore.loading ? t('auth.registering') : t('auth.register') }}
        </button>

        <p class="auth-link">
          {{ t('auth.hasAccount') }}
          <router-link to="/sign-in">
            {{ t('auth.signIn') }}
          </router-link>
        </p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  background: #f7fbfc;
}

.auth-brand {
  background: var(--cs-dark);
  color: var(--cs-white);
  display: flex;
  align-items: center;
  padding: 64px;
  position: relative;
  overflow: hidden;
}

.auth-brand::before,
.auth-brand::after {
  content: "";
  position: absolute;
  border: 1px solid rgba(69, 221, 229, 0.18);
  border-radius: 50%;
}

.auth-brand::before {
  width: 520px;
  height: 520px;
  right: -120px;
  top: 250px;
}

.auth-brand::after {
  width: 340px;
  height: 340px;
  right: -40px;
  top: 335px;
}

.brand-content {
  max-width: 500px;
  position: relative;
  z-index: 2;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 72px;
}

.brand-mark {
  color: var(--cs-primary);
}

.auth-brand h1 {
  font-size: 48px;
  line-height: 1.15;
  margin: 0 0 24px;
  font-weight: 800;
}

.auth-brand p {
  font-size: 18px;
  line-height: 1.8;
  color: #d8eef2;
}

.demo-card {
  margin-top: 56px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(153, 255, 246, 0.2);
  border-radius: 16px;
}

.demo-card h3 {
  margin: 0 0 12px;
  color: var(--cs-primary);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.demo-card p {
  margin: 6px 0;
  font-size: 14px;
}

.auth-form-section {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 40px;
}

.language-switch-wrapper {
  position: absolute;
  top: 60px;
  right: 160px;
}

.auth-form {
  width: 100%;
  max-width: 560px;
}

.auth-form h2 {
  font-size: 32px;
  margin: 0 0 8px;
  font-weight: 800;
  color: var(--cs-dark);
}

.subtitle {
  margin: 0 0 32px;
  color: #61738a;
  font-size: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  display: block;
  margin-bottom: 18px;
  font-weight: 700;
  color: var(--cs-dark);
  font-size: 14px;
}

input {
  width: 100%;
  height: 54px;
  margin-top: 10px;
  padding: 0 18px;
  border: 1px solid #d5e0e8;
  border-radius: 10px;
  background: #ffffff;
  color: var(--cs-dark);
  font-size: 16px;
  outline: none;
}

input:focus {
  border-color: var(--cs-primary);
  box-shadow: 0 0 0 4px rgba(69, 221, 229, 0.18);
}

.primary-button {
  width: 100%;
  height: 58px;
  border: none;
  border-radius: 10px;
  background: var(--cs-primary);
  color: var(--cs-dark);
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 8px;
}

.primary-button:hover:not(:disabled) {
  background: var(--cs-primary-strong);
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: wait;
}

.auth-link {
  text-align: center;
  margin-top: 24px;
  color: #61738a;
}

.error-message {
  background: #ffecec;
  color: #a50000;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
}

@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
  }

  .auth-brand {
    display: none;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .language-switch-wrapper {
    top: 24px;
    right: 24px;
  }
}
</style>