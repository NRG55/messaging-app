import { api } from '../../api/client';

export const fetchCurrentUser = async () => {
    return await api('/users/me');    
};

export const registerUser = async (registrationData) => {
    return await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registrationData),
    });
};

export const loginUser = async (credentials) => {
    return await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

export const logoutUser = async () => {
    return await api('/auth/logout', { 
        method: 'POST', 
    });
};