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
       
        const error = new Error(errorMessage);
       
        error.responseData = errorData;
        error.status = response.status;

        throw error;
    }

    return response.status === 204 ? null : response.json();
};