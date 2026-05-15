const MedicalStaffList = () =>
    import("./views/medical-staff-list.vue");

const MedicalStaffForm = () =>
    import("./views/medical-staff-form.vue");

const MedicalStaffDetail = () =>
    import("./views/medical-staff-detail.vue");

const medicalStaffRoutes = [
    {
        path: "list",
        name: "medical-staff-list",
        component: MedicalStaffList,
        meta: {
            title: "Medical Staff"
        }
    },
    {
        path: "new",
        name: "medical-staff-create",
        component: MedicalStaffForm,
        meta: {
            title: "Register Medical Staff"
        }
    },
    {
        path: ":id",
        name: "medical-staff-detail",
        component: MedicalStaffDetail,
        meta: {
            title: "Medical Staff Detail"
        }
    },
    {
        path: ":id/edit",
        name: "medical-staff-edit",
        component: MedicalStaffForm,
        meta: {
            title: "Edit Medical Staff"
        }
    }
];

export default medicalStaffRoutes;