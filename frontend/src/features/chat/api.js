import { api } from '../../api/client';

export const getOrCreateDirectChat = (targetUserId) =>
    api('/chats/direct', {
        method: 'POST',
        body: JSON.stringify({ targetUserId }),
    });

export const createGroupChat = ({ chatName, chatMembersIds }) =>
    api('/chats/group', {
        method: 'POST',
        body: JSON.stringify({ chatName, chatMembersIds }),
    });

export const fetchUserChats = () => api('/chats');

export const fetchChatMessages = (chatId) => api(`/chats/${chatId}/messages`);

export const sendChatMessage = ({ chatId, text }) =>
    api(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text }),
    });