import { createRouter, createWebHistory } from "vue-router";

import iamRoutes from "./iam/presentation/iam-routes.js";
import medicalStaffRoutes from "./iam/presentation/medical-staff-routes.js";

import { authenticationGuard } from "./iam/infrastructure/authentication.guard.js";

const AppLayout = () =>
    import("./shared/presentation/components/app-layout.vue");

const AdminDashboard = () =>
    import("./shared/presentation/views/admin-dashboard.vue");

const SupervisorDashboard = () =>
    import("./shared/presentation/views/supervisor-dashboard.vue");

const MedicalStaffStatus = () =>
    import("./shared/presentation/views/medical-staff-status.vue");

const PlaceholderPage = () =>
    import("./shared/presentation/views/placeholder-page.vue");

const Unauthorized = () => import("./shared/presentation/views/unauthorized.vue");
const PageNotFound = () => import("./shared/presentation/views/page-not-found.vue");
// Layout

import billingRoutes from "./subscription-and-plan-management/presentation/router/billing-routes.js";
const InvitationManagement = () =>
    import("./iam/presentation/views/invitation-management.vue");

/**
 * CortiSense application routes.
 */
const routes = [
    // RUTAS PÚBLICAS
    {
        path: "/",
        redirect: "/auth/sign-in"
    },
    {
        path: "/sign-in",
        redirect: "/auth/sign-in"
    },
    {
        path: "/sign-up",
        redirect: "/auth/sign-up"
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
                path: "",
                redirect: "/admin/dashboard"
            },
            {
                path: "dashboard",
                name: "admin-dashboard",
                component: AdminDashboard,
                meta: {
                    title: "Admin Dashboard"
                }
            },
            ...billingRoutes,
            {
                path: "staff",
                redirect: "/admin/staff/list",
                children: medicalStaffRoutes
            },
            {
                path: "invitations",
                name: "admin-invitations",
                component: InvitationManagement,
                meta: {
                    title: "Invitations"
                }
            },
            {
                path: "subscription",
                name: "admin-subscription",
                component: PlaceholderPage,
                meta: {
                    title: "Subscription",
                    titleKey: "navigation.subscription",
                    descriptionKey: "placeholder.subscription"
                }
            },
            {
                path: "reports",
                name: "admin-reports",
                component: PlaceholderPage,
                meta: {
                    title: "Reports",
                    titleKey: "navigation.reports",
                    descriptionKey: "placeholder.reports"
                }
            },
            {
                path: "audit",
                name: "admin-audit",
                component: PlaceholderPage,
                meta: {
                    title: "Audit",
                    titleKey: "navigation.audit",
                    descriptionKey: "placeholder.audit"
                }
            },
            {
                path: "settings",
                name: "admin-settings",
                component: PlaceholderPage,
                meta: {
                    title: "Settings",
                    titleKey: "navigation.settings",
                    descriptionKey: "placeholder.settings"
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
                path: "",
                redirect: "/supervisor/dashboard"
            },
            {
                path: "dashboard",
                name: "supervisor-dashboard",
                component: SupervisorDashboard,
                meta: {
                    title: "Supervisor Dashboard"
                }
            },
            {
                path: "risk-staff",
                name: "supervisor-risk-staff",
                component: PlaceholderPage,
                meta: {
                    title: "Staff at Risk",
                    titleKey: "navigation.riskStaff",
                    descriptionKey: "placeholder.riskStaff"
                }
            },
            {
                path: "alerts",
                name: "supervisor-alerts",
                component: PlaceholderPage,
                meta: {
                    title: "Clinical Alerts",
                    titleKey: "navigation.clinicalAlerts",
                    descriptionKey: "placeholder.clinicalAlerts"
                }
            },
            {
                path: "anomalies",
                name: "supervisor-anomalies",
                component: PlaceholderPage,
                meta: {
                    title: "Anomalies",
                    titleKey: "navigation.anomalies",
                    descriptionKey: "placeholder.anomalies"
                }
            },
            {
                path: "preventive-actions",
                name: "supervisor-preventive-actions",
                component: PlaceholderPage,
                meta: {
                    title: "Preventive Actions",
                    titleKey: "navigation.preventiveActions",
                    descriptionKey: "placeholder.preventiveActions"
                }
            },
            {
                path: "settings",
                name: "supervisor-settings",
                component: PlaceholderPage,
                meta: {
                    title: "Settings",
                    titleKey: "navigation.settings",
                    descriptionKey: "placeholder.settings"
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
                path: "",
                redirect: "/medical-staff/status"
            },
            {
                path: "status",
                name: "medical-staff-status",
                component: MedicalStaffStatus,
                meta: {
                    title: "My Status"
                }
            },
            {
                path: "cortisol",
                name: "medical-staff-cortisol",
                component: PlaceholderPage,
                meta: {
                    title: "My Cortisol",
                    titleKey: "navigation.myCortisol",
                    descriptionKey: "placeholder.myCortisol"
                }
            },
            {
                path: "shifts",
                name: "medical-staff-shifts",
                component: PlaceholderPage,
                meta: {
                    title: "My Shifts",
                    titleKey: "navigation.myShifts",
                    descriptionKey: "placeholder.myShifts"
                }
            },
            {
                path: "recovery",
                name: "medical-staff-recovery",
                component: PlaceholderPage,
                meta: {
                    title: "My Recovery",
                    titleKey: "navigation.myRecovery",
                    descriptionKey: "placeholder.myRecovery"
                }
            },
            {
                path: "settings",
                name: "medical-staff-settings",
                component: PlaceholderPage,
                meta: {
                    title: "Settings",
                    titleKey: "navigation.settings",
                    descriptionKey: "placeholder.settings"
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

    {
        path: "/:pathMatch(.*)*",
        name: "page-not-found",
        component: PageNotFound,
        meta: {
            title: "Page Not Found"
        }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        };
    }
});

router.beforeEach((to) => {
    document.title = `CortiSense - ${to.meta.title || "Platform"}`;

    const redirectPath = authenticationGuard(to);

    if (redirectPath) {
        return redirectPath;
    }

    return true;
});

export default router;