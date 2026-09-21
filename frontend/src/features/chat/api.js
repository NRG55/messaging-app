import { api } from '../../api/client';

export const getOrCreateDirectChat = (targetUserId) =>
    api('/chats/direct', {
        method: 'POST',
        body: JSON.stringify({ targetUserId }),
    });

export const createGroupChat = (formData) =>
    api('/chats/group', {
        method: 'POST',
        body: formData,
    });

export const fetchUserChats = () => api('/chats');

export const fetchChatMessages = (chatId) => api(`/chats/${chatId}/messages`);

export const sendChatMessage = ({ chatId, text }) =>
    api(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text }),
    });