import {Subscription} from "../../domain/model/entities/subcription.entity.js";

export class SubscriptionAssembler {
    static toEntityFromResource(resource) {
        return new Subscription(
            resource.id,
            resource.plan_name,
            resource.current_status,
            resource.billing_cycle_end
        );
    }
}