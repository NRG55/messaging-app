import prisma from '../config/prisma.js';

const BASE_CHAT_INCLUDE = {
    members: {
        include: {
            user: {
                select: { id: true, username: true, avatarUrl: true },
            },
        },
    },
};

export const ChatService = {
    async getOrCreateDirectChat(userId1, userId2) {
        const existingChat = await prisma.chat.findFirst({
            where: {
                type: 'DIRECT',
                AND: [
                    { members: { some: { userId: userId1 } } },
                    { members: { some: { userId: userId2 } } },
                ],
            },
            include: BASE_CHAT_INCLUDE,
        });

        if (existingChat) {
            return existingChat;
        }

        return await prisma.chat.create({
            data: {
                type: 'DIRECT',
                members: {
                    create: [{ userId: userId1 }, { userId: userId2 }],
                },
            },
            include: BASE_CHAT_INCLUDE,
        });
    },

    async createGroupChat(creatorId, chatName, chatMembersIds) {
        const uniqueChatMemberIds = Array.from(new Set([creatorId, ...chatMembersIds]));

        const members = uniqueChatMemberIds.map((userId) => ({ userId }));

        return await prisma.chat.create({
            data: {
                type: 'GROUP',
                name: chatName,
                members: {
                    create: members,
                },
            },
            include: BASE_CHAT_INCLUDE,
        });
    },

    async getUserChats(userId) {
        const chats = await prisma.chat.findMany({
            where: {
                members: {
                    some: { userId },
                },
            },
            include: {
                ...BASE_CHAT_INCLUDE,
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    include: {
                        sender: { select: { username: true } },
                    },
                },
            },
        });

        const formattedChats = chats.map(chat => formatChat(chat, userId));
        const sortedByLatestActivityChats = formattedChats.sort((a, b) => b.lastActivity - a.lastActivity);

        return sortedByLatestActivityChats;
    },
};

function formatChat(chat, currentUserId) {
    const latestMessage = chat.messages?.[0] || null;

    const lastActivity = latestMessage ? new Date(latestMessage.createdAt) : new Date(chat.createdAt);
    const formattedLatestMessage = latestMessage ? {
        id: latestMessage.id,
        text: latestMessage.text,
        senderName: latestMessage.sender.username,
        createdAt: latestMessage.createdAt,
    } : null;

    let chatName = chat.name;
    let avatarUrl = null;

    if (chat.type === 'DIRECT') {
        const otherMember = chat.members.find(member => member.userId !== currentUserId);

        if (otherMember?.user) {
            chatName = otherMember.user.username;
            avatarUrl = otherMember.user.avatarUrl;
        }
    }

    return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        avatarUrl,
        latestMessage: formattedLatestMessage,
        lastActivity,
    };
}