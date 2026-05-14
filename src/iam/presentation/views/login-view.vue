<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useIamStore from '../../application/internal/services/iam.store.js';
import { SignInCommand } from '../../domain/model/commands/sign-in.command.js';

const { t } = useI18n();
const router = useRouter();
const route  = useRoute();
const store  = useIamStore();

const email    = ref('');
const password = ref('');
const touched  = ref(false);

const emailError    = computed(() => touched.value && !email.value ? t('auth.errors.email_required') : '');
const passwordError = computed(() => touched.value && !password.value ? t('auth.errors.password_required') : '');
const serverError   = computed(() => store.errors.length ? t(store.errors[0]) : '');

async function handleSubmit() {
  touched.value = true;
  if (!email.value || !password.value) return;

  const ok = await store.signIn(new SignInCommand(email.value, password.value));
  if (ok) {
    const redirect = route.query.redirect || '/dashboard';
    await router.push(redirect);
  }
}
</script>

<template>
  <div class="auth-shell">
    <!-- Left brand panel -->
    <aside class="auth-brand">
      <div class="brand-inner">
        <div class="brand-logo">
          <span class="logo-icon">✦</span>
          <span class="logo-text">MediSync</span>
        </div>
        <h2 class="brand-headline">Clinical care,<br/>beautifully organised.</h2>
        <p class="brand-sub">The unified workspace for modern medical teams.</p>

        <div class="brand-hints">
          <p class="hint-label">Demo credentials</p>
          <div class="hint-row"><span>admin@medisync.com</span><span>·</span><span>medisync2026</span></div>
          <div class="hint-row"><span>doctor@medisync.com</span><span>·</span><span>medisync2026</span></div>
        </div>

        <div class="brand-decor" aria-hidden="true">
          <div class="decor-ring ring-1"></div>
          <div class="decor-ring ring-2"></div>
        </div>
      </div>
    </aside>

    <!-- Right form panel -->
    <main class="auth-form-panel">
      <div class="auth-form-card">
        <div class="form-header">
          <h1>{{ t('auth.welcome_back') }}</h1>
          <p class="text-muted">{{ t('auth.login_subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
          <div class="field-group">
            <label for="email">{{ t('auth.email') }}</label>
            <input
                id="email"
                v-model="email"
                type="email"
                :class="['ms-input', { 'ms-input--error': emailError }]"
                :placeholder="t('auth.email')"
                autocomplete="email"
            />
            <span v-if="emailError" class="field-error">{{ emailError }}</span>
          </div>

          <div class="field-group">
            <div class="label-row">
              <label for="password">{{ t('auth.password') }}</label>
              <a href="#" class="forgot-link">{{ t('auth.forgot_password') }}</a>
            </div>
            <input
                id="password"
                v-model="password"
                type="password"
                :class="['ms-input', { 'ms-input--error': passwordError }]"
                :placeholder="t('auth.password')"
                autocomplete="current-password"
            />
            <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
          </div>

          <div v-if="serverError" class="server-error" role="alert">
            <i class="pi pi-exclamation-circle"></i>
            {{ serverError }}
          </div>

          <button type="submit" class="ms-btn-primary" :disabled="store.loading">
            <span v-if="store.loading" class="btn-spinner"></span>
            <span>{{ store.loading ? t('auth.logging_in') : t('auth.login') }}</span>
          </button>
        </form>

        <p class="auth-switch">
          {{ t('auth.no_account') }}
          <router-link to="/iam/register">{{ t('auth.sign_up') }}</router-link>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Shell */
.auth-shell {
  display: flex;
  min-height: 100vh;
}

/* Brand panel */
.auth-brand {
  position: relative;
  width: 44%;
  background: var(--ms-sidebar-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 3rem;
}
@media (max-width: 800px) { .auth-brand { display: none; } }

.brand-inner { position: relative; z-index: 2; }

.brand-logo {
  display: flex;
  align-items: center;
  gap: .6rem;
  margin-bottom: 3rem;
}
.logo-icon {
  font-size: 1.6rem;
  color: var(--ms-primary-light);
}
.logo-text {
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  color: #fff;
  letter-spacing: -.5px;
}

.brand-headline {
  font-family: 'DM Serif Display', serif;
  font-size: 2.4rem;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 1rem;
}
.brand-sub {
  color: var(--ms-sidebar-text);
  font-size: .95rem;
  max-width: 280px;
  margin-bottom: 3rem;
}

.brand-hints {
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}
.hint-label {
  font-size: .7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--ms-primary-light);
  margin-bottom: .5rem;
}
.hint-row {
  display: flex;
  gap: .5rem;
  font-size: .82rem;
  color: var(--ms-sidebar-text);
  margin-bottom: .2rem;
}

/* Decorative rings */
.brand-decor { position: absolute; top: 0; right: -80px; bottom: 0; pointer-events: none; z-index: 1; }
.decor-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(20,168,168,.2);
}
.ring-1 { width: 420px; height: 420px; top: 10%; right: -100px; }
.ring-2 { width: 280px; height: 280px; top: 30%; right: -30px; border-color: rgba(20,168,168,.1); }

/* Form panel */
.auth-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--ms-bg);
}

.auth-form-card {
  width: 100%;
  max-width: 420px;
}

.form-header {
  margin-bottom: 2rem;
}
.form-header h1 {
  font-size: 1.75rem;
  margin-bottom: .35rem;
}

/* Fields */
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem; }

.field-group { display: flex; flex-direction: column; gap: .4rem; }
.field-group label {
  font-size: .82rem;
  font-weight: 600;
  color: var(--ms-text);
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forgot-link {
  font-size: .78rem;
  color: var(--ms-primary);
}

.ms-input {
  height: 44px;
  padding: 0 .875rem;
  border: 1.5px solid var(--ms-border);
  border-radius: 8px;
  font-family: inherit;
  font-size: .9rem;
  color: var(--ms-text);
  background: var(--ms-surface);
  transition: border-color .2s, box-shadow .2s;
  outline: none;
}
.ms-input:focus {
  border-color: var(--ms-primary);
  box-shadow: 0 0 0 3px rgba(13,110,110,.12);
}
.ms-input--error { border-color: var(--ms-danger); }

.field-error {
  font-size: .78rem;
  color: var(--ms-danger);
}

/* Server error */
.server-error {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: .85rem;
  color: var(--ms-danger);
  background: rgba(224,82,82,.08);
  border: 1px solid rgba(224,82,82,.25);
  border-radius: 8px;
  padding: .65rem .875rem;
}

/* Submit button */
.ms-btn-primary {
  height: 46px;
  background: var(--ms-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  transition: background .2s, transform .1s;
  margin-top: .25rem;
}
.ms-btn-primary:hover:not(:disabled) { background: var(--ms-primary-dark); }
.ms-btn-primary:active:not(:disabled) { transform: scale(.98); }
.ms-btn-primary:disabled { opacity: .65; cursor: not-allowed; }

.btn-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Switch link */
.auth-switch {
  text-align: center;
  font-size: .85rem;
  color: var(--ms-text-muted);
}
.auth-switch a { font-weight: 600; }
</style>
