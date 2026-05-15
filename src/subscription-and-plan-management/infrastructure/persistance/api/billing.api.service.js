import { BaseApi }      from '../../../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../../../shared/infrastructure/base-endpoint.js';

const billingEndpointPath       = import.meta.env.VITE_BILLING_ENDPOINT_PATH       || '/billing';
const subscriptionsEndpointPath = import.meta.env.VITE_SUBSCRIPTIONS_ENDPOINT_PATH || '/subscriptions';
const usersEndpointPath         = import.meta.env.VITE_USERS_ENDPOINT_PATH         || '/users';

/**
 * Infrastructure gateway for the Billing bounded-context endpoints.
 * Extends BaseApi to reuse the shared Axios instance (base URL, headers).
 * Uses BaseEndpoint for standard CRUD on subscriptions.
 *
 * @class BillingApiService
 * @extends BaseApi
 */
export class BillingApiService extends BaseApi {
    /** @type {BaseEndpoint} */
    #subscriptionsEndpoint;

    constructor() {
        super();
        this.#subscriptionsEndpoint = new BaseEndpoint(this, subscriptionsEndpointPath);
    }

    // -------------------------------------------------------------------------
    // Checkout
    // -------------------------------------------------------------------------

    /**
     * Sends a CreateCheckoutSessionCommand to the backend.
     * Expects the response to contain { checkoutUrl } for redirection.
     *
     * @param {import('../../domain/model/commands/create-checkout-session.command.js').CreateCheckoutSessionCommand} command
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    createCheckoutSession(command) {
        return this.http.post(`${billingEndpointPath}/checkout`, command);
    }

    // -------------------------------------------------------------------------
    // Subscriptions
    // -------------------------------------------------------------------------

    /**
     * Fetches the active subscription for a given user.
     * Endpoint: GET /users/{userId}/subscription
     *
     * @param {string|number} userId
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getSubscriptionByUserId(userId) {
        return this.http.get(`${usersEndpointPath}/${userId}/subscription`);
    }

    /**
     * Fetches a subscription by its own id.
     * Endpoint: GET /subscriptions/{id}
     *
     * @param {string|number} id
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getSubscriptionById(id) {
        return this.#subscriptionsEndpoint.getById(id);
    }

    /**
     * Sends a CancelSubscriptionCommand.
     * Endpoint: PATCH /subscriptions/{subscriptionId}
     *
     * @param {import('../../domain/model/commands/cancel-subscription.command.js').CancelSubscriptionCommand} command
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    cancelSubscription(command) {
        return this.http.patch(
            `${subscriptionsEndpointPath}/${command.subscriptionId}`,
            { cancel_at_period_end: command.cancelAtPeriodEnd }
        );
    }

    // -------------------------------------------------------------------------
    // Invoices (history)
    // -------------------------------------------------------------------------

    /**
     * Retrieves invoice history for a user.
     * Endpoint: GET /billing/invoices?userId={userId}
     *
     * @param {string|number} userId
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    getInvoiceHistory(userId) {
        return this.http.get(`${billingEndpointPath}/invoices`, { params: { userId } });
    }
}
