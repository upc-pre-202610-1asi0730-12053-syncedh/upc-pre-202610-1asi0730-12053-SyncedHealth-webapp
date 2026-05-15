const MedicalStaffList = () =>
    import("./views/medical-staff-list.vue");

const MedicalStaffForm = () =>
    import("./views/medical-staff-form.vue");

const MedicalStaffDetail = () =>
    import("./views/medical-staff-detail.vue");

/**
 * Staff Management routes.
 *
 * These routes belong to the Staff Management bounded context.
 */
const staffManagementRoutes = [
    {
        path: "list",
        name: "medical-staff-list",
        component: MedicalStaffList,
        meta: {
            title: "Medical Staff",
            layout: "app"
        }
    },
    {
        path: "new",
        name: "medical-staff-create",
        component: MedicalStaffForm,
        meta: {
            title: "Register Medical Staff",
            layout: "app"
        }
    },
    {
        path: ":id",
        name: "medical-staff-detail",
        component: MedicalStaffDetail,
        meta: {
            title: "Medical Staff Detail",
            layout: "app"
        }
    },
    {
        path: ":id/edit",
        name: "medical-staff-edit",
        component: MedicalStaffForm,
        meta: {
            title: "Edit Medical Staff",
            layout: "app"
        }
    }
];

export default staffManagementRoutes;