/**
 * User entity within the IAM bounded context.
 *
 * @class User
 */
export class User {
    #id
    #firstName
    #lastName
    #email
    #role
    #specialty
    #token

    /**
     * @param {Object} params
     * @param {string|null} [params.id=null]
     * @param {string} [params.firstName='']
     * @param {string} [params.lastName='']
     * @param {string} [params.email='']
     * @param {'admin'|'doctor'} [params.role='doctor']
     * @param {string} [params.specialty='']
     * @param {string} [params.token='']
     */
    constructor({
                    id = null,
                    firstName = '',
                    lastName = '',
                    email = '',
                    role = 'doctor',
                    specialty = '',
                    token = '',
                }) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#role = role;
        this.#specialty = specialty;
        this.#token = token;
    }

    get fullName() {
        return this.#firstName + ' ' + this.#lastName;
    }

    get isAdmin() {
        return this.#role === 'admin';
    }

    get isDoctor() {
        return this.#role === 'doctor';
    }
}