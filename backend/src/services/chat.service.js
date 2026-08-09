import prisma from '../config/prisma.js';

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
        });

        if (existingChat) {
            return existingChat;
        }

        return await prisma.chat.create({
            data: {
                type: 'DIRECT',
                members: {
                    create: [
                        { userId: userId1 },
                        { userId: userId2 },
                    ],
                },
            },
            include: {
                members: true,
            },
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
            include: {
                members: {
                    include: {
                        user: { select: { id: true, username: true, avatarUrl: true } },
                    },
                },
            },
        });
    },
};