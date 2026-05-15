<script setup>
import { onMounted } from 'vue';
import { useI18n }   from 'vue-i18n';
import useIamStore     from '../../../iam/application/internal/services/iam.store.js';
import useBillingStore from '../../application/internal/services/billing.store.js';
import { CreateCheckoutSessionCommand } from '../../domain/model/commands/create-checkout-session.command.js';
import { CancelSubscriptionCommand }    from '../../domain/model/commands/cancel-subscription.command.js';

const { t }       = useI18n();
const iamStore    = useIamStore();
const billingStore = useBillingStore();

onMounted(() => {
  if (iamStore.currentUser?.id) {
    billingStore.fetchSubscription(iamStore.currentUser.id);
  }
});

function handleSubscribe(planId) {
  const command = new CreateCheckoutSessionCommand(planId, iamStore.currentUser?.id);
  billingStore.startCheckout(command);
}

function handleCancel() {
  if (!billingStore.currentSubscription?.id) return;
  const command = new CancelSubscriptionCommand(billingStore.currentSubscription.id);
  billingStore.cancelSubscription(command);
}
</script>

<template>
  <div class="billing-page">
    <!-- Header -->
    <div class="billing-header">
      <h1>{{ t('billing.title') }}</h1>
      <p class="text-muted">Choose the plan that fits your practice.</p>
    </div>

    <!-- Current subscription status -->
    <div v-if="billingStore.subscriptionLoading" class="sub-status sub-status--loading">
      <i class="pi pi-spin pi-spinner"></i> {{ t('common.loading') }}
    </div>
    <div v-else-if="billingStore.currentSubscription" class="sub-status">
      <div class="sub-status__info">
        <span class="sub-plan">{{ billingStore.currentSubscription.planName }}</span>
        <span :class="['sub-badge', `sub-badge--${billingStore.currentSubscription.status}`]">
          {{ t(`billing.status_${billingStore.currentSubscription.status}`) }}
        </span>
        <span v-if="billingStore.currentSubscription.formattedNextBillingDate" class="sub-billing-date">
          {{ t('billing.next_billing') }}: {{ billingStore.currentSubscription.formattedNextBillingDate }}
        </span>
      </div>
      <button
          v-if="billingStore.currentSubscription.isActive && billingStore.currentSubscription.isPaid"
          class="btn-ghost-danger"
          :disabled="billingStore.loading"
          @click="handleCancel"
      >
        <i class="pi pi-times-circle"></i>
        {{ billingStore.loading ? t('common.loading') : t('billing.cancel') }}
      </button>
    </div>

    <!-- Error banner -->
    <div v-if="billingStore.errors.length" class="error-banner" role="alert">
      <i class="pi pi-exclamation-circle"></i>
      {{ t(billingStore.errors[0]) }}
    </div>

    <!-- Plans grid -->
    <div class="plans-grid">
      <div
          v-for="plan in billingStore.plans"
          :key="plan.id"
          :class="['plan-card', { 'plan-card--recommended': plan.recommended, 'plan-card--current': billingStore.currentPlanId === plan.id }]"
      >
        <div v-if="plan.recommended" class="plan-badge">Most Popular</div>
        <div v-if="billingStore.currentPlanId === plan.id" class="plan-badge plan-badge--current">Current Plan</div>

        <h3 class="plan-name">{{ plan.name }}</h3>
        <p class="plan-price">
          <strong>{{ plan.isFree ? 'Free' : `$${plan.priceMonthly}` }}</strong>
          <span v-if="!plan.isFree">/mo</span>
        </p>

        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature">
            <i class="pi pi-check"></i>
            {{ feature }}
          </li>
        </ul>

        <button
            v-if="billingStore.currentPlanId !== plan.id && !plan.isFree"
            class="btn-primary"
            :disabled="billingStore.loading"
            @click="handleSubscribe(plan.id)"
        >
          <span v-if="billingStore.loading" class="btn-spinner"></span>
          {{ billingStore.loading ? t('billing.redirecting') : t('billing.upgrade') }}
        </button>
        <div v-else-if="billingStore.currentPlanId === plan.id" class="plan-current-label">
          <i class="pi pi-check-circle"></i> Active
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.billing-page { padding: 2rem; max-width: 1000px; }

.billing-header { margin-bottom: 2rem; }
.billing-header h1 { font-size: 1.5rem; margin-bottom: .3rem; }

/* Subscription status bar */
.sub-status {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap;
  background: var(--ms-surface);
  border: 1px solid var(--ms-border);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
}
.sub-status--loading { color: var(--ms-text-muted); font-size: .9rem; }
.sub-status__info { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
.sub-plan { font-weight: 700; font-size: 1rem; }
.sub-badge {
  padding: .2rem .65rem; border-radius: 100px;
  font-size: .72rem; font-weight: 700; text-transform: uppercase;
}
.sub-badge--active    { background: rgba(61,190,120,.12); color: var(--ms-success, #3dbe78); }
.sub-badge--canceled  { background: rgba(107,122,144,.12); color: var(--ms-text-muted); }
.sub-badge--past_due  { background: rgba(224,82,82,.12); color: var(--ms-danger, #e05252); }
.sub-billing-date { font-size: .82rem; color: var(--ms-text-muted); }

/* Error */
.error-banner {
  display: flex; align-items: center; gap: .5rem;
  font-size: .85rem; color: var(--ms-danger, #e05252);
  background: rgba(224,82,82,.08);
  border: 1px solid rgba(224,82,82,.2);
  border-radius: 8px; padding: .75rem 1rem; margin-bottom: 1.5rem;
}

/* Plans grid */
.plans-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
}
@media (max-width: 800px) { .plans-grid { grid-template-columns: 1fr; } }

.plan-card {
  position: relative;
  background: var(--ms-surface);
  border: 1.5px solid var(--ms-border);
  border-radius: 16px; padding: 1.75rem;
  display: flex; flex-direction: column; gap: 1rem;
  transition: box-shadow .2s, border-color .2s;
}
.plan-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.08); }
.plan-card--recommended { border-color: var(--ms-primary, #0d6e6e); }
.plan-card--current     { border-color: var(--ms-success, #3dbe78); }

.plan-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--ms-primary, #0d6e6e); color: #fff;
  font-size: .7rem; font-weight: 700; padding: .25rem .75rem;
  border-radius: 100px; white-space: nowrap;
}
.plan-badge--current { background: var(--ms-success, #3dbe78); }

.plan-name { font-size: 1.1rem; font-weight: 700; }
.plan-price strong { font-size: 2rem; font-family: 'DM Serif Display', serif; }
.plan-price span   { font-size: .85rem; color: var(--ms-text-muted); }

.plan-features { list-style: none; display: flex; flex-direction: column; gap: .5rem; flex: 1; }
.plan-features li { display: flex; align-items: center; gap: .5rem; font-size: .88rem; }
.plan-features .pi { color: var(--ms-primary, #0d6e6e); font-size: .9rem; }

.plan-current-label {
  display: flex; align-items: center; gap: .5rem;
  color: var(--ms-success, #3dbe78); font-size: .88rem; font-weight: 600;
}

/* Buttons */
.btn-primary {
  height: 42px; background: var(--ms-primary, #0d6e6e); color: #fff;
  border: none; border-radius: 8px; font-family: inherit;
  font-size: .88rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  transition: background .2s; margin-top: auto;
}
.btn-primary:hover:not(:disabled) { filter: brightness(1.1); }
.btn-primary:disabled { opacity: .6; cursor: not-allowed; }

.btn-ghost-danger {
  display: flex; align-items: center; gap: .4rem;
  padding: .5rem 1rem; border: 1.5px solid rgba(224,82,82,.4);
  border-radius: 8px; background: transparent; color: var(--ms-danger, #e05252);
  font-family: inherit; font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: background .2s, border-color .2s;
}
.btn-ghost-danger:hover:not(:disabled) { background: rgba(224,82,82,.06); border-color: var(--ms-danger, #e05252); }
.btn-ghost-danger:disabled { opacity: .6; cursor: not-allowed; }

.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.4); border-top-color: #fff;
  border-radius: 50%; animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
