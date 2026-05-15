<script setup>
/**
 * Sign In View.
 *
 * Allows an active CortiSense user to authenticate and redirects the user to
 * the proper internal dashboard according to their role.
 */

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import LanguageSwitcher from '../../../shared/presentation/components/language-switcher.vue';
import useIamStore from '../../application/internal/services/iam.store.js';
import { SignInCommand } from '../../domain/commands/sign-in.command.js';

const router = useRouter();
const iamStore = useIamStore();
const { t } = useI18n();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

/**
 * Handles sign-in form submission.
 *
 * @returns {Promise<void>}
 */
async function onSubmit() {
  errorMessage.value = '';

  try {
    const user = await iamStore.signIn(
        new SignInCommand({
          email: email.value,
          password: password.value
        })
    );

    router.push(iamStore.getDefaultRouteByRole(user.role));
  } catch {
    errorMessage.value = t('auth.invalidCredentials');
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

        <h1>{{ t('auth.loginHeroTitle') }}</h1>

        <p>{{ t('auth.loginHeroText') }}</p>

        <div class="demo-card">
          <h3>{{ t('auth.demoCredentials') }}</h3>
          <p>admin@cortisense.com · admin123</p>
          <p>supervisor@cortisense.com · supervisor123</p>
          <p>doctor@cortisense.com · doctor123</p>
        </div>
      </div>
    </section>

    <section class="auth-form-section">
      <div class="language-switch-wrapper">
        <language-switcher />
      </div>

      <form class="auth-form" @submit.prevent="onSubmit">
        <h2>{{ t('auth.welcomeBack') }}</h2>
        <p class="subtitle">{{ t('auth.signInSubtitle') }}</p>

        <label>
          {{ t('auth.email') }}
          <input
              v-model="email"
              type="email"
              :placeholder="t('auth.email')"
              autocomplete="email"
              required
          />
        </label>

        <label>
          {{ t('auth.password') }}
          <input
              v-model="password"
              type="password"
              :placeholder="t('auth.password')"
              autocomplete="current-password"
              required
          />
        </label>

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>

        <button class="primary-button" type="submit" :disabled="iamStore.loading">
          {{ iamStore.loading ? t('auth.signingIn') : t('auth.signIn') }}
        </button>

        <p class="auth-link">
          {{ t('auth.noAccount') }}
          <router-link to="/sign-up">
            {{ t('auth.signUp') }}
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
  max-width: 460px;
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
  font-size: 52px;
  line-height: 1.12;
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
  top: 80px;
  right: 160px;
}

.auth-form {
  width: 100%;
  max-width: 520px;
}

.auth-form h2 {
  font-size: 32px;
  margin: 0 0 8px;
  font-weight: 800;
  color: var(--cs-dark);
}

.subtitle {
  margin: 0 0 40px;
  color: #61738a;
  font-size: 16px;
}

label {
  display: block;
  margin-bottom: 22px;
  font-weight: 700;
  color: var(--cs-dark);
  font-size: 14px;
}

input {
  width: 100%;
  height: 56px;
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
  margin-top: 28px;
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

  .language-switch-wrapper {
    top: 24px;
    right: 24px;
  }
}
</style>