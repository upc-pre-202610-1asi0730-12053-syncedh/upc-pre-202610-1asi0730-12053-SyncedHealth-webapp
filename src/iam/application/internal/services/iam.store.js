/**
 * Application service store for the IAM bounded context.
 * Handles authentication, session persistence, and role management.
 *
 * @module useIamStore
 */
import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {User} from "../../../domain/model/entities/user.entity.js";

const SESSION_KEY = 'cortisense_session';

const useIamStore = defineStore('iam', () => {
    /**
     * Currently authenticated user, or null when unauthenticated.
     * @type {import('vue').Ref<User|null>}
     */
    const currentUser = ref(null);

    /**
     * List of error messages from the last auth operation.
     * @type {import('vue').Ref<string[]>}
     */
    const errors = ref([]);

    /**
     * True while an async auth operation is in progress.
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(false);

    /** Whether a user is currently authenticated. */
    const isAuthenticated = computed(() => currentUser.value !== null);

    /** Shorthand role checks. */
    const isAdmin  = computed(() => currentUser.value?.role === 'admin');
    const isDoctor = computed(() => currentUser.value?.role === 'doctor');

    // -------------------------------------------------------------------------
    // Session persistence helpers
    // -------------------------------------------------------------------------

    /**
     * Restores the session from localStorage if available.
     * Called once on app startup.
     */
    function restoreSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            currentUser.value = new User(data);
        } catch {
            localStorage.removeItem(SESSION_KEY);
        }
    }

    function _persistSession(user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }

    function _clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    // -------------------------------------------------------------------------
    // Auth actions
    // -------------------------------------------------------------------------

    /**
     * Simulates signing in with email + password.
     * Resolves to true on success, false on failure.
     *
     * @param {import('../domain/model/commands.js').SignInCommand} command
     * @returns {Promise<boolean>}
     */
    async function signIn(command) {
        errors.value = [];
        loading.value = true;
        try {
            // Simulate network delay
            await new Promise(r => setTimeout(r, 800));

            const match = MOCK_USERS.find(
                u => u.email === command.email && command.password === 'medisync2026'
            );

            if (!match) {
                errors.value = ['auth.errors.invalid_credentials'];
                return false;
            }

            currentUser.value = match;
            _persistSession(match);
            return true;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Simulates registering a new user.
     * Resolves to true on success.
     *
     * @param {import('../domain/model/commands.js').SignUpCommand} command
     * @returns {Promise<boolean>}
     */
    async function signUp(command) {
        errors.value = [];
        loading.value = true;
        try {
            await new Promise(r => setTimeout(r, 900));

            const newUser = new User({
                id: String(Date.now()),
                firstName: command.firstName,
                lastName: command.lastName,
                email: command.email,
                role: command.role,
                specialty: command.specialty,
                token: `mock-token-${Date.now()}`,
            });

            MOCK_USERS.push(newUser);
            currentUser.value = newUser;
            _persistSession(newUser);
            return true;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Signs the current user out.
     */
    function signOut() {
        currentUser.value = null;
        errors.value = [];
        _clearSession();
    }

    return {
        currentUser,
        errors,
        loading,
        isAuthenticated,
        isAdmin,
        isDoctor,
        restoreSession,
        signIn,
        signUp,
        signOut,
    };
});

export default useIamStore;