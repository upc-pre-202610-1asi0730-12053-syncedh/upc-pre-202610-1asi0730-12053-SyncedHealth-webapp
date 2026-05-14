import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {User} from "../../../domain/model/entities/user.entity.js";
import {UserApiService} from "../../../infrastructure/persistance/api/user-api.service.js";
import {UserAssembler} from "../../../infrastructure/assemblers/user.assembler.js";

const SESSION_KEY = 'cortisense_session';
const userApi = new UserApiService();

export const useIamStore = defineStore('iam', () => {
    const currentUser = ref(null);
    const errors = ref([]);
    const loading = ref(false);

    const isAuthenticated = computed(() => currentUser.value !== null);

    function restoreSession() {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) {
            currentUser.value = new User(JSON.parse(raw));
        }
    }

    /** @param {SignInCommand} command */
    async function signIn(command) {
        errors.value = [];
        loading.value = true;
        try {
            // Buscamos en db.json a través del service
            const userResource = await userApi.getUserByEmail(command.email);

            // Validamos contraseña dinámica
            if (userResource && userResource.password === command.password) {
                const userEntity = UserAssembler.toEntityFromResource(userResource);
                currentUser.value = userEntity;
                localStorage.setItem(SESSION_KEY, JSON.stringify(userEntity));
                return true;
            }

            errors.value = ['auth.errors.invalid_credentials'];
            return false;
        } catch (e) {
            errors.value = ['auth.errors.server_error'];
            return false;
        } finally {
            loading.value = false;
        }
    }

    /** @param {SignUpCommand} command */
    async function signUp(command) {
        errors.value = [];
        loading.value = true;
        try {
            const resource = {
                firstName: command.firstName,
                lastName: command.lastName,
                email: command.email,
                password: command.password, // Se guarda en la DB
                role: command.role,
                specialty: command.specialty,
                token: `mock-token-${Date.now()}`
            };

            const response = await userApi.createUser(resource);
            const userEntity = UserAssembler.toEntityFromResource(response.data);

            currentUser.value = userEntity;
            localStorage.setItem(SESSION_KEY, JSON.stringify(userEntity));
            return true;
        } catch (e) {
            errors.value = ['auth.errors.registration_failed'];
            return false;
        } finally {
            loading.value = false;
        }
    }

    function signOut() {
        currentUser.value = null;
        localStorage.removeItem(SESSION_KEY);
    }

    return { currentUser, errors, loading, isAuthenticated, restoreSession, signIn, signUp, signOut };
});

export default useIamStore;