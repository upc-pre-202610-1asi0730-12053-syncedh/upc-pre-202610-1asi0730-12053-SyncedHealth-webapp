/**
 * Invitation entity within the Identity & Access Management bounded context.
 *
 * Represents an invitation created by an administrator for a future user.
 *
 * @class Invitation
 */
export class Invitation {
    #id;
    #email;
    #role;
    #status;
    #createdAt;

    /**
     * Creates an invitation entity.
     *
     * @param {Object} params - Invitation attributes.
     * @param {string|null} [params.id=null] - Invitation identifier.
     * @param {string} [params.email=''] - Invited user email.
     * @param {string} [params.role='medical_staff'] - Assigned role.
     * @param {string} [params.status='pending'] - Invitation status.
     * @param {string} [params.createdAt=''] - Creation date.
     */
    constructor({
                    id = null,
                    email = "",
                    role = "medical_staff",
                    status = "pending",
                    createdAt = ""
                }) {
        this.#id = id;
        this.#email = email;
        this.#role = role;
        this.#status = status;
        this.#createdAt = createdAt;
    }

    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    get role() {
        return this.#role;
    }

    get status() {
        return this.#status;
    }

    get createdAt() {
        return this.#createdAt;
    }

    /**
     * Converts the entity into a plain resource object.
     *
     * @returns {Object} Invitation resource.
     */
    toResource() {
        return {
            id: this.#id,
            email: this.#email,
            role: this.#role,
            status: this.#status,
            createdAt: this.#createdAt
        };
    }
}