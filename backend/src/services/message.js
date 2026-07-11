import prisma from '../config/prisma.js';

export const createMessage = async ({ text, chatId, senderId }) => {

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

export const getMessages = async (chatId) => {
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