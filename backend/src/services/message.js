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