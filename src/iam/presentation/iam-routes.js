const SignIn = () => import("./views/sign-in.vue");
const SignUp = () => import("./views/sign-up.vue");

/**
 * Identity & Access Management routes.
 *
 * These routes are public and do not use the internal application layout.
 */
const iamRoutes = [
    {
        path: "/auth/sign-in",
        name: "sign-in",
        component: SignIn,
        meta: {
            title: "Sign In"
        }
    },
    {
        path: "/auth/sign-up",
        name: "sign-up",
        component: SignUp,
        meta: {
            title: "Sign Up"
        }
    }
];

export default iamRoutes;