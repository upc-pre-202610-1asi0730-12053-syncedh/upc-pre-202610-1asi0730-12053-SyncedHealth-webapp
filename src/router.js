import { createRouter, createWebHistory } from "vue-router";

import iamRoutes from "./iam/presentation/iam-routes.js";
import { resolveAuthenticationRedirect } from "./iam/infrastructure/authentication.guard.js";

const AppLayout = () => import("./shared/presentation/components/app-layout.vue");

const AdminDashboard = () => import("./shared/presentation/views/admin-dashboard.vue");
const SupervisorDashboard = () => import("./shared/presentation/views/supervisor-dashboard.vue");
const MedicalStaffStatus = () => import("./shared/presentation/views/medical-staff-status.vue");

const Unauthorized = () => import("./shared/presentation/views/unauthorized.vue");
const PageNotFound = () => import("./shared/presentation/views/page-not-found.vue");
// Layout
import AppLayout from './shared/presentation/components/app-layout.vue';
import billingRoutes from "./subscription-and-plan-management/presentation/router/billing-routes.js";

const routes = [
    // RUTAS PÚBLICAS
    {
        path: "/",
        redirect: "/sign-in"
    },

    ...iamRoutes,

    {
        path: "/admin",
        component: AppLayout,
        meta: {
            requiresAuth: true,
            roles: ["admin"]
        },
        children: [
            {
                path: "dashboard",
                name: "admin-dashboard",
                component: AdminDashboard,
                meta: {
                    title: "Admin Dashboard"
                }
            }
        ]
    },

    {
        path: "/supervisor",
        component: AppLayout,
        meta: {
            requiresAuth: true,
            roles: ["clinical_supervisor"]
        },
        children: [
            {
                path: "dashboard",
                name: "supervisor-dashboard",
                component: SupervisorDashboard,
                meta: {
                    title: "Supervisor Dashboard"
                }
            }
        ]
    },

    {
        path: "/medical-staff",
        component: AppLayout,
        meta: {
            requiresAuth: true,
            roles: ["medical_staff"]
        },
        children: [
            {
                path: "status",
                name: "medical-staff-status",
                component: MedicalStaffStatus,
                meta: {
                    title: "My Status"
                }
            }
        ]
    },

    {
        path: "/unauthorized",
        name: "unauthorized",
        component: Unauthorized,
        meta: {
            title: "Unauthorized"
        }
    },
    ...billingRoutes,

    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: PageNotFound,
        meta: {
            title: "Page Not Found"
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

/**
 * Global navigation guard.
 *
 * Protects private routes and validates role-based access.
 */
router.beforeEach((to, from, next) => {
    document.title = `CortiSense - ${to.meta.title || "Platform"}`;

    const redirectPath = resolveAuthenticationRedirect(to);

    if (redirectPath) {
        return next(redirectPath);
    }

    return next();
});

export default router;