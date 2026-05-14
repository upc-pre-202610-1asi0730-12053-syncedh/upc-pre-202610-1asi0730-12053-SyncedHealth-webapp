/**
 * Biometric data entity within the Clinical Risk Assessment bounded context.
 *
 * @class BiometricData
 */
export class BiometricData {
    #id
    #medicalStaffId
    #heartRate
    #sleepHours
    #activityLevel
    #recordedAt

    /**
     * @param {Object} params
     * @param {string|null} [params.id=null]
     * @param {string} [params.medicalStaffId='']
     * @param {number} [params.heartRate=0]
     * @param {number} [params.sleepHours=0]
     * @param {string} [params.activityLevel='low']
     * @param {string} [params.recordedAt='']
     */
    constructor({
                    id = null,
                    medicalStaffId = '',
                    heartRate = 0,
                    sleepHours = 0,
                    activityLevel = 'low',
                    recordedAt = '',
                }) {
        this.#id = id;
        this.#medicalStaffId = medicalStaffId;
        this.#heartRate = heartRate;
        this.#sleepHours = sleepHours;
        this.#activityLevel = activityLevel;
        this.#recordedAt = recordedAt;
    }

    get id() {
        return this.#id;
    }

    get medicalStaffId() {
        return this.#medicalStaffId;
    }

    get heartRate() {
        return this.#heartRate;
    }

    get sleepHours() {
        return this.#sleepHours;
    }

    get activityLevel() {
        return this.#activityLevel;
    }

    get recordedAt() {
        return this.#recordedAt;
    }

    get hasLowSleep() {
        return this.#sleepHours < 6;
    }

    get hasHighHeartRate() {
        return this.#heartRate > 100;
    }

    get isHighActivity() {
        return this.#activityLevel === 'high';
    }
}