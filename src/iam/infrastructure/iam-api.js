import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const usersPath = import.meta.env.VITE_USERS_ENDPOINT_PATH;
const invitationsPath = import.meta.env.VITE_INVITATIONS_ENDPOINT_PATH;
const medicalStaffPath = import.meta.env.VITE_MEDICAL_STAFF_ENDPOINT_PATH;

/**
 * Infrastructure gateway for Identity & Access Management operations.
 *
 * @class IamApi
 * @extends BaseApi
 */
export class IamApi extends BaseApi {
    #usersEndpoint;
    #invitationsEndpoint;
    #medicalStaffEndpoint;

    /**
     * Creates IAM endpoint clients.
     */
    constructor() {
        super();
        this.#usersEndpoint = new BaseEndpoint(this, usersPath);
        this.#invitationsEndpoint = new BaseEndpoint(this, invitationsPath);
        this.#medicalStaffEndpoint = new BaseEndpoint(this, medicalStaffPath);
    }

    /**
     * Finds an active user matching mock credentials.
     *
     * @param {string} email - User email.
     * @param {string} password - User password.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    findUserByEmailAndPassword(email, password) {
        return this.#usersEndpoint.getAll({ email, password, status: 'active' });
    }

    /**
     * Finds a pending institutional invitation by email.
     *
     * @param {string} email - Invited email.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    findPendingInvitationByEmail(email) {
        return this.#invitationsEndpoint.getAll({ email, status: 'pending' });
    }

    /**
     * Creates an active user account.
     *
     * @param {Object} resource - User resource.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    createUser(resource) {
        return this.#usersEndpoint.create(resource);
    }

    /**
     * Updates an invitation resource.
     *
     * @param {string|number} id - Invitation identifier.
     * @param {Object} resource - Partial invitation resource.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    updateInvitation(id, resource) {
        return this.#invitationsEndpoint.patch(id, resource);
    }

    /**
     * Creates a medical staff profile related to an active account.
     *
     * @param {Object} resource - Medical staff profile resource.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    createMedicalStaffProfile(resource) {
        return this.#medicalStaffEndpoint.create(resource);
    }
}
