import axios from 'axios';

const apiUrl = import.meta.env.VITE_CORTISENSE_API_URL;

/**
 * Shared base API for CortiSense infrastructure adapters.
 *
 * Centralizes the Axios instance configuration so bounded contexts do not
 * instantiate HTTP clients directly.
 *
 * @class BaseApi
 */
export class BaseApi {
    #http;

    /**
     * Initializes the Axios client with the configured API base URL.
     */
    constructor() {
        this.#http = axios.create({
            baseURL: apiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Configured Axios HTTP client.
     *
     * @returns {import('axios').AxiosInstance} Axios instance.
     */
    get http() {
        return this.#http;
    }
}