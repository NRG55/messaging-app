import prisma from '../config/prisma.js';

export const createMessage = async ({ text, chatId, senderId }) => {
    const isChatParticipant = await prisma.chatParticipant.findUnique({
        where: {
            userId_chatId: {
                userId: senderId,
                chatId: chatId,
            },
        },
    });
   
    if (!isChatParticipant) {
        throw new Error('CHAT_ACCESS_DENIED');
    }
    
    return await prisma.message.create({
        data: {
            text,
            chatId,
            senderId,
        },
        include: {
            sender: {
                select: { id: true, username: true, avatarUrl: true },
            },
        },
    });
};

export const getMessages = async (chatId, userId) => {
    const isChatParticipant = await prisma.chatParticipant.findUnique({
        where: {
            userId_chatId: { userId, chatId },
        },
    });

    if (!isChatParticipant) {
        throw new Error('CHAT_ACCESS_DENIED');
    }

    return await prisma.message.findMany({
        where: {
            chatId: chatId,
        },
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            sender: {
                select: { id: true, username: true, avatarUrl: true },
            },
        },
    });
};