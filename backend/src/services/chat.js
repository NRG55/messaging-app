import prisma from '../config/prisma.js';

export const getChat = async (userId, recipientId) => {
    return await prisma.chat.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: userId } } },
                { participants: { some: { userId: recipientId } } },
            ],
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
    });
};