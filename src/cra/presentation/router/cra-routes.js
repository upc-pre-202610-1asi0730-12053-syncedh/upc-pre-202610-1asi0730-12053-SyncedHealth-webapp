const BiometricMonitoringView = () => import('../views/biometric-monitoring-view.vue');
const DeviceManagementView = () => import('../views/device-management-view.vue');

const craRoutes = [
    {
        path: 'cra/biometrics',
        name: 'cra-biometrics',
        component: BiometricMonitoringView,
        meta: {
            title: 'Biometrics',
            roles: ['admin', 'doctor'],
        },
    },
    {
        path: 'cra/devices',
        name: 'cra-devices',
        component: DeviceManagementView,
        meta: {
            title: 'Devices',
            roles: ['admin', 'doctor'],
        },
    },
];

export default craRoutes;