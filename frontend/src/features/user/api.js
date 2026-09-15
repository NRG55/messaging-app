import { api } from '../../api/client';

export const sendHeartbeat = () => api('/users/heartbeat', { method: 'POST' });