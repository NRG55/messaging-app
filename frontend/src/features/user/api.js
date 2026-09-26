import { api } from '../../api/client';

export const fetchAllUsers = () => api('/users/all');