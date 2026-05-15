import { User } from '../domain/model/user.entity.js';

/**
 * Assembler for converting user API resources into IAM domain entities.
 *
 * @class UserAssembler
 */
export class UserAssembler {
    /**
     * Converts an API resource into a User entity.
     *
     * @param {Object} resource - User resource returned by the API.
     * @returns {User} User entity.
     */
    static toEntityFromResource(resource) {
        return new User(resource);
    }

    /**
     * Converts an API collection response into User entities.
     *
     * @param {import('axios').AxiosResponse<Array<Object>>} response - HTTP response.
     * @returns {User[]} User entity collection.
     */
    static toEntitiesFromResponse(response) {
        const resources = Array.isArray(response.data) ? response.data : [];
        return resources.map(resource => this.toEntityFromResource(resource));
    }

    /**
     * Converts a User entity into a plain API resource.
     *
     * @param {User} user - User entity.
     * @returns {Object} User resource.
     */
    static toResourceFromEntity(user) {
        return user.toResource();
    }
}