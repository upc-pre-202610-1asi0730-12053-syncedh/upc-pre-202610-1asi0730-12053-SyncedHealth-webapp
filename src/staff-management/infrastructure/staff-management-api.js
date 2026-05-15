import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const medicalStaffEndpointPath = import.meta.env.VITE_MEDICAL_STAFF_ENDPOINT_PATH;

/**
 * Infrastructure gateway for Staff Management endpoints.
 *
 * @class StaffManagementApi
 * @extends BaseApi
 */
export class StaffManagementApi extends BaseApi {
    #medicalStaffEndpoint;

    /**
     * Creates endpoint clients for the Staff Management bounded context.
     */
    constructor() {
        super();
        this.#medicalStaffEndpoint = new BaseEndpoint(this, medicalStaffEndpointPath);
    }

    /**
     * Gets all medical staff profiles.
     *
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    getMedicalStaff() {
        return this.#medicalStaffEndpoint.getAll();
    }

    /**
     * Gets a medical staff profile by id.
     *
     * @param {string|number} id - Medical staff identifier.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    getMedicalStaffById(id) {
        return this.#medicalStaffEndpoint.getById(id);
    }

    /**
     * Creates a medical staff profile.
     *
     * @param {Object} resource - Medical staff resource.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    createMedicalStaff(resource) {
        return this.#medicalStaffEndpoint.create(resource);
    }

    /**
     * Updates a medical staff profile.
     *
     * @param {string|number} id - Medical staff identifier.
     * @param {Object} resource - Medical staff resource.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    updateMedicalStaff(id, resource) {
        return this.#medicalStaffEndpoint.update(id, resource);
    }

    /**
     * Deletes a medical staff profile.
     *
     * @param {string|number} id - Medical staff identifier.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    deleteMedicalStaff(id) {
        return this.#medicalStaffEndpoint.delete(id);
    }
}