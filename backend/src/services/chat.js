import prisma from '../config/prisma.js';

export const getPublicChat = async () => {
    return await prisma.chat.findUnique({
        where: { id: 'publicChat' },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' },
                include: { sender: true },
            },
        },
    });
};

export const getChat = async (userId, recipientId) => {
    return await prisma.chat.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: userId } } },
                { participants: { some: { userId: recipientId } } },
            ],
        },
        include: {
            participants: {
                where: {
                    userId: recipientId,
                },
                include: {
                    user: {
                        select: { id: true, username: true, avatarUrl: true },
                    },
                },
            },
            messages: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });
};

export const createChat = async (userId, recipientId) => {
    const existingChat = await getChat(userId, recipientId);

    if (existingChat) {
        return existingChat;
    }

    return await prisma.chat.create({
        data: {
            participants: {
                create: [
                    { userId: userId },
                    { userId: recipientId },
                ],
            },
        },
        include: {
            participants: {
                where: {
                    userId: recipientId,
                },
                include: {
                    user: {
                        select: { id: true, username: true, avatarUrl: true },
                    },
                },
            },
        },
    });
};