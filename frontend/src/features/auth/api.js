import { api } from '../../api/client';

export const fetchCurrentUser = () => api('/users/me');

export const registerUser = (registrationData) => 
    api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registrationData),
    });

export const loginUser = (credentials) =>
    api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

export const logoutUser = () =>
    api('/auth/logout', { 
        method: 'POST', 
    });