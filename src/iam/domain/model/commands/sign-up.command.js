/**
 * Command for registering a new user.
 */
export class SignUpCommand {
    /**
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} password
     * @param {'admin'|'doctor'} role
     * @param {string} specialty
     */
    constructor(firstName, lastName, email, password, role, specialty = '') {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.specialty = specialty;
    }
}