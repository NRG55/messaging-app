import prisma from '../config/prisma.js';

export const MessageService = {
    async createMessage(chatId, senderId, text, imageUrl) {
        const membership = await prisma.chatMember.findUnique({
            where: {
                userId_chatId: { userId: senderId, chatId },
            },
        });

        if (!membership) {
            throw new Error('CHAT_ACCESS_DENIED');
        }

        return await prisma.message.create({
            data: { chatId, senderId, text, imageUrl },
            include: {
                sender: {
                    select: { id: true, username: true, avatarUrl: true },
                },
            },
        });
    },

    async getChatMessages(chatId, userId) {
        const membership = await prisma.chatMember.findUnique({
            where: {
                userId_chatId: { userId, chatId },
            },
        });

        if (!membership) {
            throw new Error('CHAT_ACCESS_DENIED');
        }

        return await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' },
            include: {
                sender: {
                    select: { id: true, username: true, avatarUrl: true },
                },
            },
        });
    },
};