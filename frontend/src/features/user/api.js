import { api } from '../../api/client';

export const fetchAllUsers = () => api('/users/all');

export const fetchCurrentUser = () => api('/users/me');

export const updateCurrentUserProfile = (updatedUserData) => api('/users', {
    method: 'PATCH',
    body: updatedUserData,
});