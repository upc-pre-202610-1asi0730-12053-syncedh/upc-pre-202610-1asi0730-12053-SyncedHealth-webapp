/**
 * Subscription entity within the Billing bounded context.
 *
 * @class Subscription
 */
export class Subscription {
    /**
     * @param {Object} params
     * @param {string|null}  [params.id=null]
     * @param {string}       [params.planId='free']
     * @param {string}       [params.planName='Free']
     * @param {'active'|'canceled'|'past_due'} [params.status='active']
     * @param {string|null}  [params.nextBillingDate=null]  ISO date string
     * @param {string|null}  [params.userId=null]
     */
    constructor({
                    id              = null,
                    planId          = 'free',
                    planName        = 'Free',
                    status          = 'active',
                    nextBillingDate = null,
                    userId          = null,
                }) {
        this.id              = id;
        this.planId          = planId;
        this.planName        = planName;
        this.status          = status;
        this.nextBillingDate = nextBillingDate ? new Date(nextBillingDate) : null;
        this.userId          = userId;
    }

    /** Whether the subscription is currently billable and valid. */
    get isActive() {
        return this.status === 'active';
    }

    /** Whether the plan is not the free tier. */
    get isPaid() {
        return this.planId !== 'free';
    }

    /**
     * Next billing date formatted for the user's locale.
     * Returns null when there is no scheduled billing (free plan / canceled).
     */
    get formattedNextBillingDate() {
        if (!this.nextBillingDate) return null;
        return this.nextBillingDate.toLocaleDateString();
    }
}
