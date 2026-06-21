import prisma from '../config/prisma.js';

export const updateUserProfile = async (userId, userProfile) => {
    const { username, bio } = userProfile;
    const data = {};

    if (username !== undefined) {
        data.username = username;
    }

    if (bio !== undefined) {
        if (bio && bio.length > 160) {            
            throw new Error('BIO_TOO_LONG');
        }

        data.bio = bio;
    }

    try {
        return await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                username: true,
                avatarUrl: true,
                bio: true,
                createdAt: true,                
            },
        });

    } catch (error) {
        // Prisma error code P2002 - Unique constraint failed       
        if (error.code === 'P2002') {
            throw new Error('USERNAME_TAKEN');
        }

        throw error;
    }
};