import { api } from '../../api/client';

export const getOrCreateDirectChat = (targetUserId) =>
    api('/chats/direct', {
        method: 'POST',
        body: { targetUserId },
    });

export const createGroupChat = (formData) => 
    api('/chats/group', {
        method: 'POST',
        body: formData,
    });

export const fetchUserChats = () => api('/chats');

export const markChatAsRead = (chatId) =>
    api(`/chats/${chatId}/read`, {
        method: 'PATCH',
    });

export const fetchChatMessages = (chatId) => api(`/chats/${chatId}/messages`);

export const sendChatMessage = (formData) =>
    api(`/chats/${formData.get('chatId')}/messages`, {
        method: 'POST',
        body: formData,
    });

export const addGroupMembers = ({ chatId, newMembersIds }) =>
    api(`/chats/group/${chatId}/members`, {
        method: 'POST',
        body: { newMembersIds },
    });