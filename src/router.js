import { createRouter, createWebHistory } from 'vue-router';
// Importaciones ajustadas a la estructura de Interfaces
import { authenticationGuard } from './iam/presentation/router/authentication.guard.js';
import iamRoutes from './iam/presentation/router/iam-routes.js';
import craRoutes from './cra/presentation/router/cra-routes.js';

// Eagerly loaded
import Landing from './shared/presentation/views/landing.vue';

// Lazy-loaded views
const Dashboard    = () => import('./shared/presentation/views/dashboard.vue');
const Unauthorized = () => import('./shared/presentation/views/unauthorized.vue');
const PageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

// Placeholders
const Patients     = () => import('./shared/presentation/views/placeholder.vue');
const Appointments = () => import('./shared/presentation/views/placeholder.vue');
const Reports      = () => import('./shared/presentation/views/placeholder.vue');
const Settings     = () => import('./shared/presentation/views/placeholder.vue');

// Layout
import AppLayout from './shared/presentation/components/app-layout.vue';

const routes = [
    // RUTAS PÚBLICAS
    {
        path: '/',
        name: 'home',
        component: Landing,
        meta: { title: 'Welcome', requiresAuth: false },
    },
    {
        path: '/iam',
        children: iamRoutes,
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: Unauthorized,
        meta: { title: 'Access Restricted' },
    },

    // RUTAS PROTEGIDAS
    {
        path: '/app',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: { title: 'Dashboard', roles: ['admin', 'doctor'] },
            },

            ...craRoutes,

            {
                path: 'patients',
                name: 'patients',
                component: Patients,
                meta: {
                    title: 'Patients',
                    roles: ['admin', 'doctor'],
                    placeholder: { icon: 'pi-users', label: 'Patients' },
                },
            },
            {
                path: 'appointments',
                name: 'appointments',
                component: Appointments,
                meta: {
                    title: 'Appointments',
                    roles: ['admin', 'doctor'],
                    placeholder: { icon: 'pi-calendar', label: 'Appointments' },
                },
            },
            {
                path: 'reports',
                name: 'reports',
                component: Reports,
                meta: {
                    title: 'Reports',
                    roles: ['admin', 'doctor'],
                    placeholder: { icon: 'pi-chart-bar', label: 'Reports' },
                },
            },
            {
                path: 'settings',
                name: 'settings',
                component: Settings,
                meta: {
                    title: 'Settings',
                    roles: ['admin'],
                    placeholder: { icon: 'pi-cog', label: 'Settings' },
                },
            },
        ],
    },

    // FALLBACK
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFound,
        meta: { title: 'Page Not Found' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});

/**
 * Global Navigation Guard
 */
router.beforeEach((to, from, next) => {
    const baseTitle = 'CortiSense';
    document.title = to.meta.title ? `${baseTitle} · ${to.meta.title}` : baseTitle;

    authenticationGuard(to, from, next);
});

export default router;