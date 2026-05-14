/**
 * Command for signing in an existing user.
 */
export class SignInCommand {
    /**
     * @param {string} email
     * @param {string} password
     */
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}