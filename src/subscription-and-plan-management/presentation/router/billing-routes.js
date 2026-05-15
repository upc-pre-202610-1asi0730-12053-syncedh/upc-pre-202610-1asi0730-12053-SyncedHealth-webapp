/**
 * Route declarations for the Billing bounded context.
 * These are children of the /app protected layout route in src/router.js.
 */
const BillingPlansView   = () => import('../views/billing-plans.view.vue');
const BillingSuccessView = () => import('../views/billing-success.view.vue');
const BillingCancelView  = () => import('../views/billing-cancel.view.vue');

const billingRoutes = [
    {
        path: 'billing',
        name: 'billing-plans',
        component: BillingPlansView,
        meta: {
            title: 'Subscription & Plans',
            requiresAuth: true,
            roles: ['admin', 'doctor'],
        },
    },
    {
        path: 'billing/success',
        name: 'billing-success',
        component: BillingSuccessView,
        meta: {
            title: 'Subscription Activated',
            requiresAuth: true,
        },
    },
    {
        path: 'billing/cancel',
        name: 'billing-cancel',
        component: BillingCancelView,
        meta: {
            title: 'Payment Canceled',
            requiresAuth: true,
        },
    },
];

export default billingRoutes;
