import { api } from '../../api/client.js';

export const sendHeartbeat = () => api('/sessions/heartbeat', { method: 'POST' });