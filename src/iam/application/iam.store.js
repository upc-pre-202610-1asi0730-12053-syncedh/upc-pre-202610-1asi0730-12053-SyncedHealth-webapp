import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { IamApi } from '../infrastructure/iam-api.js';
import { UserAssembler } from '../infrastructure/user.assembler.js';

const iamApi = new IamApi();

/**
 * IAM application store.
 *
 * Coordinates sign-in, institutional registration, session persistence and
 * role-based redirection for CortiSense.
 */
const useIamStore = defineStore('iam', () => {
    const currentUser = ref(JSON.parse(localStorage.getItem('cortisense_user')) || null);
    const errors = ref([]);
    const loading = ref(false);

    const isDoctor = computed(() => currentUser.value?.role === 'medical_staff');
    const isAdmin = computed(() => currentUser.value?.role === 'admin');

    const isAuthenticated = computed(() => !!currentUser.value);
    const role = computed(() => currentUser.value?.role || null);

    /**
     * Gets the default internal route for a user role.
     *
     * @param {string} userRole - Authenticated user role.
     * @returns {string} Internal route path.
     */
    function getDefaultRouteByRole(userRole) {
        if (userRole === 'admin') return '/admin/dashboard';
        if (userRole === 'clinical_supervisor') return '/supervisor/dashboard';
        if (userRole === 'medical_staff') return '/medical-staff/status';
        return '/unauthorized';
    }

    /**
     * Authenticates a user against the mock API.
     *
     * @param {import('../../domain/commands/sign-in.command.js').SignInCommand} command - Sign-in command.
     * @returns {Promise<Object>} Authenticated user resource.
     */
    async function signIn(command) {
        loading.value = true;
        errors.value = [];

        try {
            const response = await iamApi.findUserByEmailAndPassword(
                command.email,
                command.password
            );
            const users = UserAssembler.toEntitiesFromResponse(response);

            if (!users.length) {
                throw new Error('Invalid credentials');
            }

            const userResource = users[0].toResource();
            currentUser.value = userResource;
            localStorage.setItem('cortisense_user', JSON.stringify(userResource));

            return userResource;
        } catch (error) {
            errors.value.push(error);
            throw error;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Completes the registration of an invited user.
     *
     * The command email must match a pending invitation. The user's role is taken
     * from that invitation instead of being selected freely from the UI.
     *
     * @param {import('../../domain/commands/complete-registration.command.js').CompleteRegistrationCommand} command - Complete-registration command.
     * @returns {Promise<Object>} Created user resource.
     */
    async function completeRegistration(command) {
        loading.value = true;
        errors.value = [];

        try {
            if (!command.passwordsMatch()) {
                throw new Error('Passwords do not match');
            }

            const invitationResponse = await iamApi.findPendingInvitationByEmail(command.email);
            const invitation = invitationResponse.data[0];

            if (!invitation) {
                throw new Error('Invitation not found');
            }

            const timestamp = Date.now();
            const userId = `u-${timestamp}`;
            const medicalStaffId =
                invitation.role === 'medical_staff' || invitation.role === 'clinical_supervisor'
                    ? `ms-${timestamp}`
                    : null;

            const newUser = {
                id: userId,
                email: command.email,
                password: command.password,
                role: invitation.role,
                status: 'active',
                firstName: command.firstName,
                lastName: command.lastName,
                token: `mock-token-${timestamp}`,
                medicalStaffId
            };

            const userResponse = await iamApi.createUser(newUser);
            const createdUser = UserAssembler.toEntityFromResource(userResponse.data);

            if (medicalStaffId) {
                await iamApi.createMedicalStaffProfile({
                    id: medicalStaffId,
                    userId: createdUser.id,
                    firstName: command.firstName,
                    lastName: command.lastName,
                    email: command.email,
                    phone: command.phone,
                    area: command.area,
                    specialty: command.specialty,
                    staffRole: createdUser.role,
                    status: 'active',
                    riskLevel: 'low',
                    fatigueLevel: 0,
                    assignedDeviceId: null
                });
            }

            await iamApi.updateInvitation(invitation.id, {
                status: 'accepted'
            });

            return createdUser.toResource();
        } catch (error) {
            errors.value.push(error);
            throw error;
        } finally {
            loading.value = false;
        }
    }

    /**
     * Clears the authenticated user session.
     *
     * @returns {void}
     */
    function signOut() {
        currentUser.value = null;
        localStorage.removeItem('cortisense_user');
    }

    return {
        currentUser,
        errors,
        loading,
        isAuthenticated,
        role,
        signIn,
        completeRegistration,
        signOut,
        getDefaultRouteByRole,
        isDoctor,
        isAdmin
    };
});

export default useIamStore;