import { Invitation } from "../domain/model/invitation.entity.js";

/**
 * Maps invitation resources and domain entities.
 *
 * @class InvitationAssembler
 */
export class InvitationAssembler {
    /**
     * Converts an API resource into an Invitation entity.
     *
     * @param {Object} resource - API invitation resource.
     * @returns {Invitation} Invitation entity.
     */
    static toEntityFromResource(resource) {
        return new Invitation({ ...resource });
    }

    /**
     * Converts an Invitation entity into an API resource.
     *
     * @param {Invitation} invitation - Invitation entity.
     * @returns {Object} Invitation resource.
     */
    static toResourceFromEntity(invitation) {
        return invitation.toResource();
    }
}