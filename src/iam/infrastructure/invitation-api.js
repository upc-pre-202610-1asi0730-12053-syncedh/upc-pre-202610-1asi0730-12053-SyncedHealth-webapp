import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const invitationsEndpointPath = import.meta.env.VITE_INVITATIONS_ENDPOINT_PATH || "/invitations";

/**
 * API gateway for invitation management operations.
 *
 * @class InvitationApi
 * @extends BaseApi
 */
export class InvitationApi extends BaseApi {
    #invitationsEndpoint;

    /**
     * Initializes the invitations endpoint.
     */
    constructor() {
        super();
        this.#invitationsEndpoint = new BaseEndpoint(this, invitationsEndpointPath);
    }

    /**
     * Gets all invitations.
     *
     * @returns {Promise} API response.
     */
    getAll() {
        return this.#invitationsEndpoint.getAll();
    }

    /**
     * Finds invitations by email.
     *
     * @param {string} email - Invitation email.
     * @returns {Promise} API response.
     */
    findByEmail(email) {
        return this.#invitationsEndpoint.getAll({ email });
    }

    /**
     * Creates a new invitation.
     *
     * @param {Object} resource - Invitation resource.
     * @returns {Promise} API response.
     */
    create(resource) {
        return this.#invitationsEndpoint.create(resource);
    }

    /**
     * Updates an invitation partially.
     *
     * @param {string} id - Invitation identifier.
     * @param {Object} resource - Partial invitation resource.
     * @returns {Promise} API response.
     */
    patch(id, resource) {
        return this.#invitationsEndpoint.patch(id, resource);
    }

    /**
     * Deletes an invitation.
     *
     * @param {string} id - Invitation identifier.
     * @returns {Promise} API response.
     */
    delete(id) {
        return this.#invitationsEndpoint.delete(id);
    }
}