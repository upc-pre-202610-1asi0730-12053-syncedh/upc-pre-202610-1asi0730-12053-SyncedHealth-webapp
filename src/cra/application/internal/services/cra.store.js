import { defineStore } from 'pinia';
import { CraApiService } from '../../../infrastructure/api/cra-api.service.js';

const craApiService = new CraApiService();

const formatDateTime = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

/**
 * Store for the Clinical Risk Assessment bounded context.
 */
export const useCraStore = defineStore('cra', {
    state: () => ({
        users: [],
        medicalDevices: [],
        biometricData: [],
        loading: false,
        error: null,
    }),

    getters: {
        latestBiometricData: (state) => {
            return state.biometricData.length > 0
                ? state.biometricData[state.biometricData.length - 1]
                : null;
        },

        latestMedicalDevice: (state) => {
            return state.medicalDevices.length > 0
                ? state.medicalDevices[state.medicalDevices.length - 1]
                : null;
        },

        getUserFullNameById: (state) => {
            return (userId) => {
                const user = state.users.find(user => String(user.id) === String(userId));

                if (!user) return 'Unassigned medical staff';

                return `${user.firstName} ${user.lastName}`;
            };
        },
    },

    actions: {
        async fetchUsers() {
            try {
                const response = await craApiService.getUsers();
                this.users = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                this.error = error;
                console.error('Error fetching users:', error);
            }
        },

        async fetchMedicalDevices() {
            this.loading = true;
            this.error = null;

            try {
                const response = await craApiService.getMedicalDevices();
                this.medicalDevices = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                this.error = error;
                console.error('Error fetching medical devices:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchBiometricData() {
            this.loading = true;
            this.error = null;

            try {
                const response = await craApiService.getBiometricData();
                this.biometricData = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
                this.error = error;
                console.error('Error fetching biometric data:', error);
            } finally {
                this.loading = false;
            }
        },

        async linkMedicalDevice(deviceResource) {
            this.loading = true;
            this.error = null;

            try {
                const response = await craApiService.createMedicalDevice(deviceResource);
                this.medicalDevices.push(response.data);

                await this.fetchMedicalDevices();
            } catch (error) {
                this.error = error;
                console.error('Error linking medical device:', error);
            } finally {
                this.loading = false;
            }
        },

        async updateMedicalDeviceStatus(deviceId, syncStatus) {
            this.loading = true;
            this.error = null;

            try {
                const response = await craApiService.updateMedicalDevice(deviceId, {
                    syncStatus,
                    lastSyncAt: formatDateTime(new Date()),
                });

                const index = this.medicalDevices.findIndex(
                    device => String(device.id) === String(deviceId)
                );

                if (index !== -1) {
                    this.medicalDevices[index] = response.data;
                }

                await this.fetchMedicalDevices();
            } catch (error) {
                this.error = error;
                console.error('Error updating medical device status:', error);
            } finally {
                this.loading = false;
            }
        },

        async createBiometricData(recordResource) {
            this.loading = true;
            this.error = null;

            try {
                const response = await craApiService.createBiometricData(recordResource);
                this.biometricData.push(response.data);

                await this.fetchBiometricData();
            } catch (error) {
                this.error = error;
                console.error('Error creating biometric data:', error);
            } finally {
                this.loading = false;
            }
        },

        async generateBiometricRecordsForConnectedDevices() {
            this.loading = true;
            this.error = null;

            try {
                const connectedDevices = this.medicalDevices.filter(
                    device => device.syncStatus === 'connected'
                );

                const now = new Date();
                const formattedRecordedAt = formatDateTime(now);

                for (const device of connectedDevices) {
                    const record = {
                        id: `bio-${Date.now()}-${device.medicalStaffId}-${Math.floor(Math.random() * 1000)}`,
                        medicalStaffId: device.medicalStaffId,
                        heartRate: Math.floor(Math.random() * (105 - 65 + 1)) + 65,
                        sleepHours: Number((Math.random() * (8 - 4.5) + 4.5).toFixed(1)),
                        activityLevel: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)],
                        recordedAt: formattedRecordedAt,
                    };

                    await craApiService.createBiometricData(record);
                }

                await this.fetchBiometricData();
            } catch (error) {
                this.error = error;
                console.error('Error generating biometric records:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});