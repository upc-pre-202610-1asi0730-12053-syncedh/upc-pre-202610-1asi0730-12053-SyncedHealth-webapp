/**
 * Safely reads the authenticated user from localStorage.
 *
 * @returns {Object|null} Authenticated user resource or null.
 */
function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("cortisense_user"));
    } catch {
        localStorage.removeItem("cortisense_user");
        return null;
    }
}

/**
 * Resolves whether a route can be accessed by the current authenticated user.
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route.
 * @returns {string|null} Redirect path when access is denied; otherwise null.
 */
export function authenticationGuard(to) {
    const user = JSON.parse(localStorage.getItem("cortisense_user"));

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const allowedRoles = to.matched.flatMap((record) => record.meta.roles || []);

    if (requiresAuth && !user) {
        return "/auth/sign-in";
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return "/unauthorized";
    }

    return null;
}
