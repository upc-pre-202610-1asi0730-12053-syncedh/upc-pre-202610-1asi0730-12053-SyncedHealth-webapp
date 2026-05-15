/**
 * Command issued when a user selects a plan and initiates checkout.
 * Carries all data the billing service needs to create a payment session.
 *
 * @class CreateCheckoutSessionCommand
 */
export class CreateCheckoutSessionCommand {
    /**
     * @param {string} planId   The identifier of the plan being purchased.
     * @param {string} userId   The identifier of the authenticated user.
     */
    constructor(planId, userId) {
        this.planId     = planId;
        this.userId     = userId;
        this.successUrl = `${window.location.origin}/app/billing/success`;
        this.cancelUrl  = `${window.location.origin}/app/billing/cancel`;
    }
}
