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
    async getOrCreateDirectChat(currentUserId, targetUserId) {
        let chat = await prisma.chat.findFirst({
            where: {
                type: 'DIRECT',
                AND: [
                    { members: { some: { userId: currentUserId } } },
                    { members: { some: { userId: targetUserId } } },
                ],
            },
            include: BASE_CHAT_INCLUDE,
        });

        if (!chat) {
            chat = await prisma.chat.create({
                data: {
                    type: 'DIRECT',
                    members: {
                        create: [{ userId: currentUserId }, { userId: targetUserId }],
                    },
                },
                include: BASE_CHAT_INCLUDE,
            });
        }

        return normalizeChat(chat, currentUserId); 
    },

    async createGroupChat(creatorId, chatName, chatMembersIds) {
        const uniqueChatMemberIds = Array.from(new Set([creatorId, ...chatMembersIds]));
        const members = uniqueChatMemberIds.map((userId) => ({ userId }));

        const chat = await prisma.chat.create({
            data: {
                type: 'GROUP',
                name: chatName,
                members: {
                    create: members,
                },
            },
            include: BASE_CHAT_INCLUDE,
        });

        return normalizeChat(chat, creatorId);
    },

    async getChatById(chatId, userId) {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: BASE_CHAT_INCLUDE,
        });

        if (!chat) {
            throw new Error('CHAT_NOT_FOUND');
        }

        const isMember = chat.members.some(member => member.userId === userId);

        if (!isMember) {
            throw new Error('CHAT_ACCESS_DENIED');
        }

        return normalizeChat(chat, userId);
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

        const normalizedChats = chats.map(chat => {
            const normalizedChat = normalizeChat(chat, userId);
            const rawLatestMessage = chat.messages?.[0] || null;

            const latestMessage = rawLatestMessage ? {
                id: rawLatestMessage.id,
                text: rawLatestMessage.text,
                senderName: rawLatestMessage.sender.username,
                createdAt: rawLatestMessage.createdAt,
            } : null;

            const lastActivity = rawLatestMessage ? new Date(rawLatestMessage.createdAt) : new Date(chat.createdAt);

            return {
                ...normalizedChat,
                latestMessage,
                lastActivity,
            };

        });        

        return normalizedChats.sort((a, b) => b.lastActivity - a.lastActivity);
    },
};

function normalizeChat(chat, currentUserId) {
    let chatName = chat.name;
    let avatarUrl = chat.avatarUrl || null;

    if (chat.type === 'DIRECT') {
        const otherMember = chat.members?.find(member => member.userId !== currentUserId);

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
        createdAt: chat.createdAt,
    };
}