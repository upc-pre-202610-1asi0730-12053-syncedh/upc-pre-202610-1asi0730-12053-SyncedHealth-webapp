/**
 * Command used to complete an institutional registration from a pending invitation.
 *
 * The role is not selected by the user. It is resolved from the invitation created
 * by the administrative staff.
 *
 * @class CompleteRegistrationCommand
 */
export class CompleteRegistrationCommand {
    #email;
    #firstName;
    #lastName;
    #phone;
    #area;
    #specialty;
    #password;
    #confirmPassword;

    /**
     * Creates a complete-registration command.
     *
     * @param {Object} params - Registration data.
     * @param {string} [params.email=''] - Invited email address.
     * @param {string} [params.firstName=''] - User first name.
     * @param {string} [params.lastName=''] - User last name.
     * @param {string} [params.phone=''] - Contact phone.
     * @param {string} [params.area=''] - Work area.
     * @param {string} [params.specialty=''] - Medical specialty or professional focus.
     * @param {string} [params.password=''] - Password.
     * @param {string} [params.confirmPassword=''] - Confirmation password.
     */
    constructor({
                    email = '',
                    firstName = '',
                    lastName = '',
                    phone = '',
                    area = '',
                    specialty = '',
                    password = '',
                    confirmPassword = ''
                } = {}) {
        this.#email = email.trim().toLowerCase();
        this.#firstName = firstName.trim();
        this.#lastName = lastName.trim();
        this.#phone = phone.trim();
        this.#area = area.trim();
        this.#specialty = specialty.trim();
        this.#password = password;
        this.#confirmPassword = confirmPassword;
    }

    get email() { return this.#email; }
    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get phone() { return this.#phone; }
    get area() { return this.#area; }
    get specialty() { return this.#specialty; }
    get password() { return this.#password; }
    get confirmPassword() { return this.#confirmPassword; }

    /**
     * Validates whether password and confirmation match.
     *
     * @returns {boolean} True when both password fields match.
     */
    passwordsMatch() {
        return this.#password === this.#confirmPassword;
    }
}
