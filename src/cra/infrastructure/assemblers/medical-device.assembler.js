import { MedicalDevice } from '../../domain/model/entities/medical-device.entity.js';

/**
 * Assembler for transforming medical device resources into domain entities.
 */
export class MedicalDeviceAssembler {
    static toEntityFromResource(resource) {
        return new MedicalDevice({
            id: resource.id,
            medicalStaffId: resource.medicalStaffId,
            name: resource.name,
            type: resource.type,
            syncStatus: resource.syncStatus,
            lastSyncAt: resource.lastSyncAt,
        });
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            medicalStaffId: entity.medicalStaffId,
            name: entity.name,
            type: entity.type,
            syncStatus: entity.syncStatus,
            lastSyncAt: entity.lastSyncAt,
        };
    }
}