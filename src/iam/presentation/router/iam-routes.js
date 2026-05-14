const LoginView    = () => import('../views/login-view.vue');
const RegisterView = () => import('../views/register-view.vue');


const iamRoutes = [
    {
        path: '/login', // Añadido el /
        name: 'login',
        component: LoginView,
        meta: {
            title: 'Sign In',
            hideLayout: true,
            requiresAuth: false // Explícito para el Guard
        },
    },
    {
        path: '/register', // Añadido el /
        name: 'register',
        component: RegisterView,
        meta: {
            title: 'Create Account',
            hideLayout: true,
            requiresAuth: false // Explícito para el Guard
        },
    },
];

export default iamRoutes;