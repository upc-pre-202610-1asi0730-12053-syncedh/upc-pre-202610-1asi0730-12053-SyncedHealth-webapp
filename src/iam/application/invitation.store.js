import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { InvitationApi } from "../infrastructure/invitation-api.js";
import { Invitation } from "../domain/model/invitation.entity.js";
import { InvitationAssembler } from "../infrastructure/invitation.assembler.js";

const invitationApi = new InvitationApi();

/**
 * Invitation store.
 *
 * Coordinates invitation list, creation and cancellation use cases.
 */
const useInvitationStore = defineStore("invitation", () => {
    const invitations = ref([]);
    const errors = ref([]);
    const isLoading = ref(false);

    const totalInvitations = computed(() => invitations.value.length);

    const pendingInvitations = computed(() =>
        invitations.value.filter((invitation) => invitation.status === "pending").length
    );

    const acceptedInvitations = computed(() =>
        invitations.value.filter((invitation) => invitation.status === "accepted").length
    );

    const cancelledInvitations = computed(() =>
        invitations.value.filter((invitation) => invitation.status === "cancelled").length
    );

    /**
     * Loads all invitations from the mock API.
     *
     * @returns {Promise<void>}
     */
    async function loadInvitations() {
        isLoading.value = true;
        errors.value = [];

        try {
            const response = await invitationApi.getAll();
            invitations.value = response.data;
        } catch (error) {
            errors.value.push(error);
            invitations.value = [];
        } finally {
            isLoading.value = false;
        }
    }

    /**
     * Creates a new invitation if the email is not already invited.
     *
     * @param {import('../domain/commands/create-invitation.command.js').CreateInvitationCommand} command - Create invitation command.
     * @returns {Promise<Object|null>} Created invitation resource or null.
     */
    async function createInvitation(command) {
        errors.value = [];

        if (!command.isValid()) {
            errors.value.push("invalidInvitationData");
            return null;
        }

        try {
            const existingResponse = await invitationApi.findByEmail(command.email);
            const existingPendingInvitation = existingResponse.data.find(
                (invitation) => invitation.status === "pending"
            );

            if (existingPendingInvitation) {
                errors.value.push("invitationAlreadyExists");
                return null;
            }

            const invitation = new Invitation({
                id: `inv-${Date.now()}`,
                email: command.email,
                role: command.role,
                status: "pending",
                createdAt: new Date().toISOString()
            });

            const resource = InvitationAssembler.toResourceFromEntity(invitation);
            const response = await invitationApi.create(resource);

            invitations.value = [...invitations.value, response.data];

            return response.data;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    /**
     * Cancels an existing pending invitation.
     *
     * @param {string} id - Invitation identifier.
     * @returns {Promise<void>}
     */
    async function cancelInvitation(id) {
        errors.value = [];

        try {
            const response = await invitationApi.patch(id, { status: "cancelled" });

            invitations.value = invitations.value.map((invitation) =>
                invitation.id === id ? response.data : invitation
            );
        } catch (error) {
            errors.value.push(error);
        }
    }

    /**
     * Deletes an invitation from the mock API.
     *
     * @param {string} id - Invitation identifier.
     * @returns {Promise<void>}
     */
    async function deleteInvitation(id) {
        errors.value = [];

        try {
            await invitationApi.delete(id);
            invitations.value = invitations.value.filter((invitation) => invitation.id !== id);
        } catch (error) {
            errors.value.push(error);
        }
    }

    return {
        invitations,
        errors,
        isLoading,
        totalInvitations,
        pendingInvitations,
        acceptedInvitations,
        cancelledInvitations,
        loadInvitations,
        createInvitation,
        cancelInvitation,
        deleteInvitation
    };
});

export default useInvitationStore;