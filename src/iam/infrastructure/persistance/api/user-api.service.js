import {BaseApi} from "../../../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../../../shared/infrastructure/base-endpoint.js";

const usersEndpointPath = import.meta.env.VITE_USERS_ENDPOINT_PATH || '/users';

export class UserApiService extends BaseApi {
    #usersEndpoint;
    constructor() {
        super();
        this.#usersEndpoint = new BaseEndpoint(this, usersEndpointPath);
    }

    async getUserByEmail(email) {
        const response = await this.http.get(`${usersEndpointPath}?email=${email}`);
        // json-server devuelve un array; retornamos el primer elemento o null
        return response.data.length > 0 ? response.data[0] : null;
    }

    createUser(resource) {
        return this.#usersEndpoint.create(resource);
    }
}