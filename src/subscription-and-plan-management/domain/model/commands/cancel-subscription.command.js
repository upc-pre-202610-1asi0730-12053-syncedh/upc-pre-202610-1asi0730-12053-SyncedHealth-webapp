/**
 * Command issued when a user requests to cancel their current subscription.
 * Uses cancel_at_period_end so the user keeps access until the period ends.
 *
 * @class CancelSubscriptionCommand
 */
export class CancelSubscriptionCommand {
    /**
     * @param {string} subscriptionId  The subscription to be canceled.
     */
    constructor(subscriptionId) {
        this.subscriptionId    = subscriptionId;
        this.cancelAtPeriodEnd = true;
    }
}
