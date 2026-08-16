import { api } from '../../api/client';

export const getOrCreateDirectChat = async (targetUserId) => {
    return await api('/chats/direct', {
        method: 'POST',
        body: JSON.stringify({ targetUserId }),
    });
};

export const createGroupChat = async ({ chatName, chatMembersIds }) => {
    return await api('/chats/group', {
        method: 'POST',
        body: JSON.stringify({ chatName, chatMembersIds }),
    });
};

export const fetchUserChats = async() => {
    return await api('/chats');
};

export const fetchChatMessages = async (chatId) => {
    return await api(`/chats/${chatId}/messages`);
};

export const sendChatMessage = async ({ chatId, messageData }) => {
    return await api(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: JSON.stringify(messageData),
    });
};