import {toRaw} from "vue";

/**
 * User entity within the Identity & Access Management bounded context.
 *
 * Represents an authenticated CortiSense account. This entity keeps its
 * attributes private and exposes read-only access through getters.
 *
 * @class User
 */
export class User {
    #id;
    #email;
    #password;
    #role;
    #status;
    #firstName;
    #lastName;
    #token;
    #medicalStaffId;

    /**
     * Creates a user entity.
     *
     * @param {Object} params - User attributes.
     * @param {string|null} [params.id=null] - User identifier.
     * @param {string} [params.email=''] - User email address.
     * @param {string} [params.password=''] - User password used by the mock API.
     * @param {string} [params.role=''] - User role: admin, clinical_supervisor or medical_staff.
     * @param {string} [params.status='inactive'] - Account status.
     * @param {string} [params.firstName=''] - User first name.
     * @param {string} [params.lastName=''] - User last name.
     * @param {string} [params.token=''] - Mock authentication token.
     * @param {string|null} [params.medicalStaffId=null] - Related medical staff profile identifier.
     */
    constructor({
                    id = null,
                    email = '',
                    password = '',
                    role = '',
                    status = 'inactive',
                    firstName = '',
                    lastName = '',
                    token = '',
                    medicalStaffId = null
                } = {}) {
        this.#id = id;
        this.#email = email;
        this.#password = password;
        this.#role = role;
        this.#status = status;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#token = token;
        this.#medicalStaffId = medicalStaffId;
    }

    get id() { return this.#id; }
    get email() { return this.#email; }
    get password() { return this.#password; }
    get role() { return toRaw(this).#role; }
    get status() { return this.#status; }
    get firstName() { return this.#firstName; }
    get lastName() { return this.#lastName; }
    get token() { return this.#token; }
    get medicalStaffId() { return this.#medicalStaffId; }

    /**
     * Full display name used in authenticated layouts.
     *
     * @returns {string} User full name.
     */
    get fullName() {
        return `${this.#firstName} ${this.#lastName}`.trim();
    }

    /**
     * Indicates whether the user account can access the platform.
     *
     * @returns {boolean} True when the account is active.
     */
    get isActive() {
        return this.#status === 'active';
    }

    /**
     * Converts this entity into a plain resource object.
     *
     * This method is required because private class fields are not serialized by
     * JSON.stringify. The session stored in localStorage must be a plain object.
     *
     * @returns {Object} Resource representation of the user.
     */
    toResource() {
        return {
            id: this.#id,
            email: this.#email,
            password: this.#password,
            role: this.#role,
            status: this.#status,
            firstName: this.#firstName,
            lastName: this.#lastName,
            token: this.#token,
            medicalStaffId: this.#medicalStaffId
        };
    }
}