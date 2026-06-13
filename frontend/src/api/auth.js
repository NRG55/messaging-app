const BASE_URL = 'http://localhost:3000/auth';

const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        const errorPayload = new Error('API Request Failed');
        errorPayload.responseData = data;

        throw errorPayload;
    }

    return data;
};

export const registerUser = async (payload) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

export const loginUser = async (payload) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    
    return handleResponse(response);
};