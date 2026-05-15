import { createRouter, createWebHistory } from "vue-router";
import iamRoutes from "./iam/presentation/iam-routes.js";
import medicalStaffRoutes from "./iam/presentation/medical-staff-routes.js";
import { authenticationGuard } from "./iam/infrastructure/authentication.guard.js";

const AdminDashboard = () =>
    import("./shared/presentation/views/admin-dashboard.vue");

const SupervisorDashboard = () =>
    import("./shared/presentation/views/supervisor-dashboard.vue");

const MedicalStaffStatus = () =>
    import("./shared/presentation/views/medical-staff-status.vue");

const PlaceholderPage = () =>
    import("./shared/presentation/views/placeholder-page.vue");

const Unauthorized = () =>
    import("./shared/presentation/views/unauthorized.vue");

const PageNotFound = () =>
    import("./shared/presentation/views/page-not-found.vue");

/**
 * CortiSense route definitions.
 */
const routes = [
    {
        path: "/",
        redirect: "/auth/sign-in"
    },

    ...iamRoutes,

    {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        component: AdminDashboard,
        meta: {
            title: "Admin Dashboard",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/staff",
        name: "staff-management-root",
        redirect: "/admin/staff/list",
        meta: {
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/staff",
        children: medicalStaffRoutes,
        meta: {
            title: "Staff Management",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/invitations",
        name: "admin-invitations",
        component: PlaceholderPage,
        meta: {
            title: "Invitations",
            titleKey: "navigation.invitations",
            descriptionKey: "placeholder.invitations",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/subscription",
        name: "admin-subscription",
        component: PlaceholderPage,
        meta: {
            title: "Subscription",
            titleKey: "navigation.subscription",
            descriptionKey: "placeholder.subscription",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/reports",
        name: "admin-reports",
        component: PlaceholderPage,
        meta: {
            title: "Reports",
            titleKey: "navigation.reports",
            descriptionKey: "placeholder.reports",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/audit",
        name: "admin-audit",
        component: PlaceholderPage,
        meta: {
            title: "Audit",
            titleKey: "navigation.audit",
            descriptionKey: "placeholder.audit",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/admin/settings",
        name: "admin-settings",
        component: PlaceholderPage,
        meta: {
            title: "Settings",
            titleKey: "navigation.settings",
            descriptionKey: "placeholder.settings",
            requiresAuth: true,
            roles: ["admin"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/dashboard",
        name: "supervisor-dashboard",
        component: SupervisorDashboard,
        meta: {
            title: "Supervisor Dashboard",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/risk-staff",
        name: "supervisor-risk-staff",
        component: PlaceholderPage,
        meta: {
            title: "Risk Staff",
            titleKey: "navigation.riskStaff",
            descriptionKey: "placeholder.riskStaff",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/alerts",
        name: "supervisor-alerts",
        component: PlaceholderPage,
        meta: {
            title: "Clinical Alerts",
            titleKey: "navigation.clinicalAlerts",
            descriptionKey: "placeholder.clinicalAlerts",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/anomalies",
        name: "supervisor-anomalies",
        component: PlaceholderPage,
        meta: {
            title: "Anomalies",
            titleKey: "navigation.anomalies",
            descriptionKey: "placeholder.anomalies",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/preventive-actions",
        name: "supervisor-preventive-actions",
        component: PlaceholderPage,
        meta: {
            title: "Preventive Actions",
            titleKey: "navigation.preventiveActions",
            descriptionKey: "placeholder.preventiveActions",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/supervisor/settings",
        name: "supervisor-settings",
        component: PlaceholderPage,
        meta: {
            title: "Settings",
            titleKey: "navigation.settings",
            descriptionKey: "placeholder.settings",
            requiresAuth: true,
            roles: ["clinical_supervisor"],
            layout: "app"
        }
    },

    {
        path: "/medical-staff/status",
        name: "medical-staff-status",
        component: MedicalStaffStatus,
        meta: {
            title: "Medical Staff Status",
            requiresAuth: true,
            roles: ["medical_staff"],
            layout: "app"
        }
    },

    {
        path: "/medical-staff/cortisol",
        name: "medical-staff-cortisol",
        component: PlaceholderPage,
        meta: {
            title: "My Cortisol",
            titleKey: "navigation.myCortisol",
            descriptionKey: "placeholder.myCortisol",
            requiresAuth: true,
            roles: ["medical_staff"],
            layout: "app"
        }
    },

    {
        path: "/medical-staff/shifts",
        name: "medical-staff-shifts",
        component: PlaceholderPage,
        meta: {
            title: "My Shifts",
            titleKey: "navigation.myShifts",
            descriptionKey: "placeholder.myShifts",
            requiresAuth: true,
            roles: ["medical_staff"],
            layout: "app"
        }
    },

    {
        path: "/medical-staff/recovery",
        name: "medical-staff-recovery",
        component: PlaceholderPage,
        meta: {
            title: "My Recovery",
            titleKey: "navigation.myRecovery",
            descriptionKey: "placeholder.myRecovery",
            requiresAuth: true,
            roles: ["medical_staff"],
            layout: "app"
        }
    },

    {
        path: "/medical-staff/settings",
        name: "medical-staff-settings",
        component: PlaceholderPage,
        meta: {
            title: "Settings",
            titleKey: "navigation.settings",
            descriptionKey: "placeholder.settings",
            requiresAuth: true,
            roles: ["medical_staff"],
            layout: "app"
        }
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

/**
 * Vue Router instance.
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

/**
 * Global navigation guard.
 */
router.beforeEach((to) => {
    document.title = `CortiSense - ${to.meta.title ?? "App"}`;

    const redirectPath = authenticationGuard(to);

    if (redirectPath) {
        return redirectPath;
    }

    return true;
});

export default router;