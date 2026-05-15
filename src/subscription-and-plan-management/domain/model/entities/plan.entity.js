/**
 * Plan entity within the Billing bounded context.
 * Represents a purchasable subscription tier.
 *
 * @class Plan
 */
export class Plan {
    /**
     * @param {Object} params
     * @param {string}   params.id           Unique plan identifier (e.g. 'pro', 'enterprise')
     * @param {string}   params.name         Display name
     * @param {number}   params.priceMonthly Monthly price in USD
     * @param {string[]} params.features     List of included features
     * @param {boolean}  [params.recommended=false]
     */
    constructor({ id, name, priceMonthly, features = [], recommended = false }) {
        this.id           = id;
        this.name         = name;
        this.priceMonthly = priceMonthly;
        this.features     = features;
        this.recommended  = recommended;
    }

    get isFree() {
        return this.priceMonthly === 0;
    }

    get formattedPrice() {
        if (this.isFree) return 'Free';
        return `$${this.priceMonthly}/mo`;
    }
}
