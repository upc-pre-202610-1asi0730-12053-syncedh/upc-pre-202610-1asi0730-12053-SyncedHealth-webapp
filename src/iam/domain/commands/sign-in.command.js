/**
 * Command used to authenticate a CortiSense user.
 *
 * @class SignInCommand
 */
export class SignInCommand {
    #email;
    #password;

    /**
     * Creates a sign-in command.
     *
     * @param {Object} params - Sign-in data.
     * @param {string} [params.email=''] - User email.
     * @param {string} [params.password=''] - User password.
     */
    constructor({ email = '', password = '' } = {}) {
        this.#email = email.trim().toLowerCase();
        this.#password = password;
    }

    get email() { return this.#email; }
    get password() { return this.#password; }
}