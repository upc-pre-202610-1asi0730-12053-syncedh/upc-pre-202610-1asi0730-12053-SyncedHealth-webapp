import { useIamStore } from '../../application/internal/services/iam.store.js';

/**
 * Authentication Guard
 * En sintonía con Clean Architecture: actúa como un intermediario entre el Router y el Application Service (Store).
 */
export function authenticationGuard(to, from, next) {
    const store = useIamStore();

    const requiresAuth = to.meta.requiresAuth === true;
    const allowedRoles = Array.isArray(to.meta.roles) ? to.meta.roles : null;

    // 1. Si la ruta no requiere autenticación, permitimos el paso.
    if (!requiresAuth) return next();

    // 2. Si requiere autenticación y el usuario no está logueado.
    if (!store.isAuthenticated) {
        return next({ name: 'login', query: { redirect: to.fullPath } });
    }

    // 3. Si hay restricción de roles y el usuario no tiene el rol permitido.
    // Usamos store.currentUser.role que viene de nuestra entidad User.
    if (allowedRoles && !allowedRoles.includes(store.currentUser?.role)) {
        return next({ name: 'unauthorized' });
    }


    return next();
}