import { api } from '../../api/client';

export const registerUser = (registrationData) => 
    api('/auth/register', {
        method: 'POST',
        body: registrationData,
    });

export const loginUser = (credentials) =>
    api('/auth/login', {
        method: 'POST',
        body: credentials,
    });

export const logoutUser = () =>
    api('/auth/logout', { 
        method: 'POST', 
    });