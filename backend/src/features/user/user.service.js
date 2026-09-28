import prisma from '../../config/prisma.js';
import { CloudinaryUtils } from '../../utils/cloudinary.utils.js';

export const UserService = {
    async findById(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        return user;
    },

    async getAllExceptCurrentUser(currentUserId) {
        return await prisma.user.findMany({
            where: {
                id: {
                    not: currentUserId,
                },
            },
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                lastSeen: true,
                bio: true,
            },
            orderBy: {
                username: 'asc',
            },
        });
    },

    async updateProfile(userId, updateData) {
        const user = await prisma.user.findUnique({ 
            where: { id: userId }, 
        });

        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        if (updateData.username && updateData.username !== user.username) {
            const existingUser = await prisma.user.findUnique({
                where: { username: updateData.username },
            });

            if (existingUser) {
                throw new Error('USERNAME_TAKEN');
            }
        }

        if (updateData.avatarUrl && user.avatarUrl) {
            CloudinaryUtils.deleteImageByUrl(user.avatarUrl);
        }

        return await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
                createdAt: true,
            },
        });
    },
};

export const getUserProfile = async (userId) => {
    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            avatarUrl: true,
            bio: true,
            createdAt: true,
        },
    });

    if (!userProfile) {
        throw new Error('USER_NOT_FOUND');
    }

    return userProfile;
};