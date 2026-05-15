/**
 * Command used to create a new user invitation.
 *
 * @class CreateInvitationCommand
 */
export class CreateInvitationCommand {
    #email;
    #role;

    /**
     * Creates a command for invitation registration.
     *
     * @param {Object} params - Command data.
     * @param {string} params.email - Invited user email.
     * @param {string} params.role - Assigned role.
     */
    constructor({ email, role }) {
        this.#email = email;
        this.#role = role;
    }

    get email() {
        return this.#email;
    }

    get role() {
        return this.#role;
    }

    /**
     * Validates whether the command has the required data.
     *
     * @returns {boolean} True when the command is valid.
     */
    isValid() {
        return Boolean(this.#email && this.#role);
    }
}