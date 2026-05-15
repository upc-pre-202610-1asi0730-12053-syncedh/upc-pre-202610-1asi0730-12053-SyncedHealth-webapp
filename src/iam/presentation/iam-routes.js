const SignIn = () => import("./views/sign-in.vue");
const SignUp = () => import("./views/sign-up.vue");

const iamRoutes = [
    {
        path: "/sign-in",
        name: "sign-in",
        component: SignIn,
        meta: { title: "Sign In" }
    },
    {
        path: "/sign-up",
        name: "sign-up",
        component: SignUp,
        meta: { title: "Complete Registration" }
    }
];

export default iamRoutes;