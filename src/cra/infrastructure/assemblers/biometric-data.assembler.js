import { BiometricData } from '../../domain/model/entities/biometric-data.entity.js';

/**
 * Assembler for transforming biometric data resources into domain entities.
 */
export class BiometricDataAssembler {
    static toEntityFromResource(resource) {
        return new BiometricData({
            id: resource.id,
            medicalStaffId: resource.medicalStaffId,
            heartRate: resource.heartRate,
            sleepHours: resource.sleepHours,
            activityLevel: resource.activityLevel,
            recordedAt: resource.recordedAt,
        });
    }

    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}