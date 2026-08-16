class ApiError extends Error {
    constructor(message, status, responseData) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.responseData = responseData;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = async (endpoint, options = {}) => {
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },       
        credentials: 'include',
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
        let errorData = null;
        let errorMessage = 'Something went wrong';

        try {
            errorData = await response.json();

            if (errorData && errorData.message) {
                errorMessage = errorData.message;
            }

        } catch {
            errorData = { message: 'Something went wrong' };
        }
       
        throw new ApiError(errorMessage, response.status, errorData);
    }

    if (response.status === 204) {
        return null;
    }

    const result = await response.json();

    return result.hasOwnProperty('data') ? result.data : result;
};