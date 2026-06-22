const BASE_URL = 'http://localhost:3000';

const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        const error = new Error('API Request Failed');
        error.responseData = data;

        throw error;
    }

    return data;
};

export const registerUser = async (payload) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

export const loginUser = async (payload) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};

export const logoutUser = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',        
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
    });

    return handleResponse(response);
};

export const updateUserProfile = async (payload) => {
    const response = await fetch(`${BASE_URL}/user`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
};