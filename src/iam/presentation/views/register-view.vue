<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useIamStore from '../../application/internal/services/iam.store.js';
import { SignUpCommand } from '../../domain/model/commands/sign-up.command.js';

const { t } = useI18n();
const router = useRouter();
const store  = useIamStore();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: null,
  specialty: '',
});
const touched = ref(false);

const roles = computed(() => [
  { label: t('auth.role_admin'), value: 'admin' },
  { label: t('auth.role_doctor'), value: 'doctor' },
]);

const errors = computed(() => {
  if (!touched.value) return {};
  const e = {};
  if (!form.value.firstName) e.firstName = t('auth.errors.name_required');
  if (!form.value.email) e.email = t('auth.errors.email_required');
  if (!form.value.password) e.password = t('auth.errors.password_required');
  if (form.value.password !== form.value.confirmPassword) e.confirmPassword = t('auth.errors.password_mismatch');
  if (!form.value.role) e.role = t('auth.errors.role_required');
  return e;
});

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

async function handleSubmit() {
  touched.value = true;
  if (hasErrors.value) return;

  const cmd = new SignUpCommand(
      form.value.firstName,
      form.value.lastName,
      form.value.email,
      form.value.password,
      form.value.role,
      form.value.specialty,
  );

  const ok = await store.signUp(cmd);
  if (ok) router.push('/dashboard');
}
</script>

<template>
  <div class="auth-shell">
    <!-- Brand panel -->
    <aside class="auth-brand">
      <div class="brand-inner">
        <div class="brand-logo">
          <span class="logo-icon">✦</span>
          <span class="logo-text">MediSync</span>
        </div>
        <h2 class="brand-headline">Join thousands<br/>of clinicians<br/>already inside.</h2>
        <p class="brand-sub">Set up your account in under two minutes. No credit card required.</p>
        <div class="brand-decor" aria-hidden="true">
          <div class="decor-ring ring-1"></div>
          <div class="decor-ring ring-2"></div>
        </div>
      </div>
    </aside>

    <!-- Form panel -->
    <main class="auth-form-panel">
      <div class="auth-form-card">
        <div class="form-header">
          <h1>{{ t('auth.create_account') }}</h1>
          <p class="text-muted">{{ t('auth.register_subtitle') }}</p>
        </div>

        <form class="auth-form" @submit.prevent="handleSubmit" novalidate>
          <div class="field-row">
            <div class="field-group">
              <label>{{ t('auth.first_name') }}</label>
              <input v-model="form.firstName" type="text" :class="['ms-input', { 'ms-input--error': errors.firstName }]" :placeholder="t('auth.first_name')" />
              <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
            </div>
            <div class="field-group">
              <label>{{ t('auth.last_name') }}</label>
              <input v-model="form.lastName" type="text" class="ms-input" :placeholder="t('auth.last_name')" />
            </div>
          </div>

          <div class="field-group">
            <label>{{ t('auth.email') }}</label>
            <input v-model="form.email" type="email" :class="['ms-input', { 'ms-input--error': errors.email }]" :placeholder="t('auth.email')" />
            <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
          </div>

          <div class="field-group">
            <label>{{ t('auth.role') }}</label>
            <div class="role-selector">
              <label
                  v-for="r in roles"
                  :key="r.value"
                  :class="['role-card', { active: form.role === r.value }]"
              >
                <input type="radio" :value="r.value" v-model="form.role" class="sr-only" />
                <i :class="r.value === 'admin' ? 'pi pi-shield' : 'pi pi-heart'" class="role-icon"></i>
                <span>{{ r.label }}</span>
              </label>
            </div>
            <span v-if="errors.role" class="field-error">{{ errors.role }}</span>
          </div>

          <div v-if="form.role === 'doctor'" class="field-group">
            <label>{{ t('auth.specialty') }}</label>
            <input v-model="form.specialty" type="text" class="ms-input" placeholder="e.g. Cardiology" />
          </div>

          <div class="field-group">
            <label>{{ t('auth.password') }}</label>
            <input v-model="form.password" type="password" :class="['ms-input', { 'ms-input--error': errors.password }]" :placeholder="t('auth.password')" />
            <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
          </div>

          <div class="field-group">
            <label>{{ t('auth.confirm_password') }}</label>
            <input v-model="form.confirmPassword" type="password" :class="['ms-input', { 'ms-input--error': errors.confirmPassword }]" :placeholder="t('auth.confirm_password')" />
            <span v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</span>
          </div>

          <button type="submit" class="ms-btn-primary" :disabled="store.loading">
            <span v-if="store.loading" class="btn-spinner"></span>
            {{ store.loading ? t('auth.registering') : t('auth.register') }}
          </button>
        </form>

        <p class="auth-switch">
          {{ t('auth.have_account') }}
          <router-link to="/iam/login">{{ t('auth.sign_in') }}</router-link>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.auth-shell { display: flex; min-height: 100vh; }

.auth-brand {
  position: relative;
  width: 40%;
  background: var(--ms-sidebar-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 3rem;
}
@media (max-width: 800px) { .auth-brand { display: none; } }

.brand-inner { position: relative; z-index: 2; }

.brand-logo { display: flex; align-items: center; gap: .6rem; margin-bottom: 3rem; }
.logo-icon { font-size: 1.6rem; color: var(--ms-primary-light); }
.logo-text { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #fff; }

.brand-headline { font-family: 'DM Serif Display', serif; font-size: 2.2rem; color: #fff; line-height: 1.2; margin-bottom: 1rem; }
.brand-sub { color: var(--ms-sidebar-text); font-size: .92rem; max-width: 280px; }

.brand-decor { position: absolute; top: 0; right: -80px; bottom: 0; pointer-events: none; z-index: 1; }
.decor-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(20,168,168,.2); }
.ring-1 { width: 420px; height: 420px; top: 10%; right: -100px; }
.ring-2 { width: 280px; height: 280px; top: 30%; right: -30px; border-color: rgba(20,168,168,.1); }

.auth-form-panel { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--ms-bg); overflow-y: auto; }
.auth-form-card { width: 100%; max-width: 440px; padding: 1rem 0; }
.form-header { margin-bottom: 1.75rem; }
.form-header h1 { font-size: 1.6rem; margin-bottom: .3rem; }

.auth-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.25rem; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }

.field-group { display: flex; flex-direction: column; gap: .35rem; }
.field-group label { font-size: .82rem; font-weight: 600; color: var(--ms-text); }

.ms-input {
  height: 44px; padding: 0 .875rem;
  border: 1.5px solid var(--ms-border); border-radius: 8px;
  font-family: inherit; font-size: .9rem; color: var(--ms-text);
  background: var(--ms-surface); transition: border-color .2s, box-shadow .2s; outline: none;
}
.ms-input:focus { border-color: var(--ms-primary); box-shadow: 0 0 0 3px rgba(13,110,110,.12); }
.ms-input--error { border-color: var(--ms-danger); }
.field-error { font-size: .78rem; color: var(--ms-danger); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

/* Role selector */
.role-selector { display: flex; gap: .75rem; }
.role-card {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: .4rem;
  padding: .75rem; border: 1.5px solid var(--ms-border); border-radius: 10px;
  cursor: pointer; transition: all .2s; background: var(--ms-surface);
  font-size: .85rem; font-weight: 500; color: var(--ms-text-muted);
}
.role-card:hover { border-color: var(--ms-primary); color: var(--ms-primary); }
.role-card.active { border-color: var(--ms-primary); background: rgba(13,110,110,.06); color: var(--ms-primary); }
.role-icon { font-size: 1.25rem; }

.ms-btn-primary {
  height: 46px; background: var(--ms-primary); color: #fff; border: none; border-radius: 8px;
  font-family: inherit; font-size: .9rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  transition: background .2s, transform .1s; margin-top: .25rem;
}
.ms-btn-primary:hover:not(:disabled) { background: var(--ms-primary-dark); }
.ms-btn-primary:disabled { opacity: .65; cursor: not-allowed; }

.btn-spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.auth-switch { text-align: center; font-size: .85rem; color: var(--ms-text-muted); }
.auth-switch a { font-weight: 600; }
</style>
