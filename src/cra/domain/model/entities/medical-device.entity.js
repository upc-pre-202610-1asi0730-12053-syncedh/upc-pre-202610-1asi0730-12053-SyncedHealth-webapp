/**
 * Medical device entity within the Clinical Risk Assessment bounded context.
 *
 * @class MedicalDevice
 */
export class MedicalDevice {
    #id
    #medicalStaffId
    #name
    #type
    #syncStatus
    #lastSyncAt

    /**
     * @param {Object} params
     * @param {string|null} [params.id=null]
     * @param {string} [params.medicalStaffId='']
     * @param {string} [params.name='']
     * @param {string} [params.type='wearable']
     * @param {'connected'|'syncing'|'disconnected'} [params.syncStatus='disconnected']
     * @param {string} [params.lastSyncAt='']
     */
    constructor({
                    id = null,
                    medicalStaffId = '',
                    name = '',
                    type = 'wearable',
                    syncStatus = 'disconnected',
                    lastSyncAt = '',
                }) {
        this.#id = id;
        this.#medicalStaffId = medicalStaffId;
        this.#name = name;
        this.#type = type;
        this.#syncStatus = syncStatus;
        this.#lastSyncAt = lastSyncAt;
    }

    get id() {
        return this.#id;
    }

    get medicalStaffId() {
        return this.#medicalStaffId;
    }

    get name() {
        return this.#name;
    }

    get type() {
        return this.#type;
    }

    get syncStatus() {
        return this.#syncStatus;
    }

    get lastSyncAt() {
        return this.#lastSyncAt;
    }

    get isConnected() {
        return this.#syncStatus === 'connected';
    }

    get isSyncing() {
        return this.#syncStatus === 'syncing';
    }

    get isDisconnected() {
        return this.#syncStatus === 'disconnected';
    }
}