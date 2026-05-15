/**
 * Application service store for the Billing bounded context.
 * Coordinates checkout, subscription fetching, and cancellation use cases.
 * Mirrors the composition-API style used by useIamStore.
 *
 * @module useBillingStore
 */
import { ref, computed } from 'vue';
import { defineStore }   from 'pinia';
import { BillingApiService }      from '../../../infrastructure/persistance/api/billing.api.service.js';
import { SubscriptionAssembler }  from '../../../infrastructure/assemblers/subscription.assembler.js';
import { Plan }                   from '../../../domain/model/entities/plan.entity.js';

const billingApi = new BillingApiService();

// ---------------------------------------------------------------------------
// Static plan catalogue (replace with an API call when the backend is ready)
// ---------------------------------------------------------------------------
const PLANS = [
    new Plan({
        id: 'free',
        name: 'Free',
        priceMonthly: 0,
        features: [
            'Up to 30 biometric readings/month',
            'Basic shift overview',
            'Community support',
        ],
        recommended: false,
    }),
    new Plan({
        id: 'pro',
        name: 'Pro',
        priceMonthly: 29,
        features: [
            'Unlimited biometric history',
            'AI burnout predictions',
            'Custom shift templates',
            'Priority support',
        ],
        recommended: true,
    }),
    new Plan({
        id: 'enterprise',
        name: 'Enterprise',
        priceMonthly: 99,
        features: [
            'Everything in Pro',
            'Multi-physician team dashboard',
            'HIPAA-ready exports',
            'Dedicated account manager',
        ],
        recommended: false,
    }),
];

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useBillingStore = defineStore('billing', () => {
    /**
     * The currently authenticated user's subscription, or null if not loaded.
     * @type {import('vue').Ref<import('../../../domain/model/entities/subscription.entity.js').Subscription|null>}
     */
    const currentSubscription = ref(null);

    /**
     * Available plans (static catalogue).
     * @type {import('vue').Ref<Plan[]>}
     */
    const plans = ref(PLANS);

    /**
     * Error message keys from the last failed operation.
     * @type {import('vue').Ref<string[]>}
     */
    const errors = ref([]);

    /** True while an async billing operation is in progress. */
    const loading = ref(false);

    /** True while the subscription is being fetched. */
    const subscriptionLoading = ref(false);

    // Computed ----------------------------------------------------------------

    /** Whether the user has a loaded, active subscription. */
    const hasActiveSubscription = computed(
        () => currentSubscription.value?.isActive ?? false
    );

    /** The plan id of the current subscription, or 'free' as default. */
    const currentPlanId = computed(
        () => currentSubscription.value?.planId ?? 'free'
    );

    // Actions -----------------------------------------------------------------

    /**
     * Initiates a Stripe/payment-processor checkout session.
     * On success, redirects the browser to the hosted checkout page.
     *
     * @param {import('../../../domain/model/commands/create-checkout-session.command.js').CreateCheckoutSessionCommand} command
     * @returns {Promise<void>}
     */
    async function startCheckout(command) {
        errors.value = [];
        loading.value = true;
        try {
            const response = await billingApi.createCheckoutSession(command);
            if (response.data?.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
            }
        } catch (err) {
            console.error('BillingStore.startCheckout:', err);
            errors.value = ['billing.errors.checkout_failed'];
        } finally {
            loading.value = false;
        }
    }

    /**
     * Loads the subscription for the given user from the API.
     *
     * @param {string|number} userId
     * @returns {Promise<void>}
     */
    async function fetchSubscription(userId) {
        errors.value = [];
        subscriptionLoading.value = true;
        try {
            const response = await billingApi.getSubscriptionByUserId(userId);
            currentSubscription.value = SubscriptionAssembler.toEntityFromResource(response.data);
        } catch (err) {
            console.error('BillingStore.fetchSubscription:', err);
            // A 404 is expected for free-tier users — treat as no subscription
            currentSubscription.value = null;
            if (err.response?.status !== 404) {
                errors.value = ['billing.errors.fetch_failed'];
            }
        } finally {
            subscriptionLoading.value = false;
        }
    }

    /**
     * Sends the cancel commands and updates local state on success.
     *
     * @param {import('../../../domain/model/commands/cancel-subscription.commands.js').CancelSubscriptionCommand} command
     * @returns {Promise<boolean>} true on success
     */
    async function cancelSubscription(command) {
        errors.value = [];
        loading.value = true;
        try {
            await billingApi.cancelSubscription(command);
            // Reflect cancellation locally without a full refetch
            if (currentSubscription.value) {
                currentSubscription.value.status = 'canceled';
            }
            return true;
        } catch (err) {
            console.error('BillingStore.cancelSubscription:', err);
            errors.value = ['billing.errors.cancel_failed'];
            return false;
        } finally {
            loading.value = false;
        }
    }

    return {
        // State
        currentSubscription,
        plans,
        errors,
        loading,
        subscriptionLoading,
        // Computed
        hasActiveSubscription,
        currentPlanId,
        // Actions
        startCheckout,
        fetchSubscription,
        cancelSubscription,
    };
});

export default useBillingStore;
