import { MedicalStaff } from '../domain/model/medical-staff.entity.js';

/**
 * Maps medical staff resources into MedicalStaff domain entities.
 *
 * @class MedicalStaffAssembler
 */
export class MedicalStaffAssembler {
    /**
     * Converts an API resource into a MedicalStaff entity.
     *
     * @param {Object} resource - Medical staff resource.
     * @returns {MedicalStaff} MedicalStaff entity.
     */
    static toEntityFromResource(resource) {
        return new MedicalStaff({ ...resource });
    }

    /**
     * Converts a list response into MedicalStaff entities.
     *
     * @param {import('axios').AxiosResponse<Array<Object>|Object>} response - HTTP response.
     * @returns {MedicalStaff[]} MedicalStaff entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['medical_staff'] ?? [];

        return resources.map(resource => this.toEntityFromResource(resource));
    }

    /**
     * Converts a MedicalStaff entity into a resource.
     *
     * @param {MedicalStaff} entity - MedicalStaff entity.
     * @returns {Object} Medical staff resource.
     */
    static toResourceFromEntity(entity) {
        return entity.toResource();
    }
}