/**
 * Generic endpoint wrapper with common CRUD operations.
 *
 * @class BaseEndpoint
 */
export class BaseEndpoint {
    #http;
    #endpointPath;

    /**
     * Creates a base endpoint.
     *
     * @param {import('./base-api.js').BaseApi} baseApi - API owner with configured HTTP client.
     * @param {string} endpointPath - Relative endpoint path.
     */
    constructor(baseApi, endpointPath) {
        this.#http = baseApi.http;
        this.#endpointPath = endpointPath;
    }

    /**
     * Gets a resource collection.
     *
     * @param {Object} [params={}] - Query parameters.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    getAll(params = {}) {
        return this.#http.get(this.#endpointPath, { params });
    }

    /**
     * Gets one resource by id.
     *
     * @param {string|number} id - Resource identifier.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    getById(id) {
        return this.#http.get(`${this.#endpointPath}/${id}`);
    }

    /**
     * Creates a resource.
     *
     * @param {Object} resource - Resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    create(resource) {
        return this.#http.post(this.#endpointPath, resource);
    }

    /**
     * Replaces a resource.
     *
     * @param {string|number} id - Resource identifier.
     * @param {Object} resource - Resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    update(id, resource) {
        return this.#http.put(`${this.#endpointPath}/${id}`, resource);
    }

    /**
     * Partially updates a resource.
     *
     * @param {string|number} id - Resource identifier.
     * @param {Object} resource - Partial resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    patch(id, resource) {
        return this.#http.patch(`${this.#endpointPath}/${id}`, resource);
    }

    /**
     * Deletes a resource.
     *
     * @param {string|number} id - Resource identifier.
     * @returns {Promise<import('axios').AxiosResponse>} HTTP response.
     */
    delete(id) {
        return this.#http.delete(`${this.#endpointPath}/${id}`);
    }
}
