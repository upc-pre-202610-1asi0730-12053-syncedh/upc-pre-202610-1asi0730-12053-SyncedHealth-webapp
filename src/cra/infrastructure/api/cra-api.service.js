import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_CORTISENSE_API_URL,
});

const usersEndpointPath = import.meta.env.VITE_USERS_ENDPOINT_PATH || '/users';
const medicalDevicesEndpointPath = import.meta.env.VITE_MEDICAL_DEVICES_ENDPOINT_PATH || '/medicalDevices';
const biometricDataEndpointPath = import.meta.env.VITE_BIOMETRIC_DATA_ENDPOINT_PATH || '/biometricData';

/**
 * API service for the Clinical Risk Assessment bounded context.
 */
export class CraApiService {
    getUsers() {
        return http.get(usersEndpointPath);
    }

    getMedicalDevices() {
        return http.get(medicalDevicesEndpointPath);
    }

    getBiometricData() {
        return http.get(biometricDataEndpointPath);
    }

    getBiometricDataByMedicalStaffId(medicalStaffId) {
        return http.get(`${biometricDataEndpointPath}?medicalStaffId=${medicalStaffId}`);
    }

    createMedicalDevice(resource) {
        return http.post(medicalDevicesEndpointPath, resource);
    }

    updateMedicalDevice(id, resource) {
        return http.patch(`${medicalDevicesEndpointPath}/${id}`, resource);
    }

    createBiometricData(resource) {
        return http.post(biometricDataEndpointPath, resource);
    }
}