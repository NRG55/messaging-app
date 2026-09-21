import prisma from '../../config/prisma.js';
import cloudinary from '../../config/cloudinary.js';

const userActivityMap = new Map();
const DB_WRITE_GAP_MS = 3 * 60 * 1000; // 3 minutes
const USER_INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export const userService = {
    async recordUserActivity(userId) {
        const now = Date.now();
        const lastDbWrite = userActivityMap.get(userId) || 0;

        userActivityMap.set(userId, now);

        if (now - lastDbWrite <= DB_WRITE_GAP_MS) {
            return;
        }

        return await prisma.user.update({
            where: { id: userId },
            data: { lastSeen: new Date(now) },
        });
    },

    isUserOnline(userId) {
        const lastUserActivityDate = userActivityMap.get(userId);

        if (!lastUserActivityDate) {
            return false;
        }

        const now = Date.now();
        
        return (now - lastUserActivityDate) < USER_INACTIVITY_TIMEOUT_MS; 
    },

    startCleanupUserActivity() {
        setInterval(() => {
            const now = Date.now();
            let removedUsersCount = 0;

            for (const [userId, lastActivityDate] of userActivityMap.entries()) {
                if (now - lastActivityDate > USER_INACTIVITY_TIMEOUT_MS) {
                    userActivityMap.delete(userId);
                    removedUsersCount++;
                }
            }

            if (removedUsersCount > 0) {
                console.log(`Cleared ${removedUsersCount} inactive users from memory.`);
            }

        }, 30 * 60 * 1000); // 30 minutes
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

export const updateUserProfile = async (userId, userProfile) => {
    const { username, avatarUrl, bio } = userProfile;
    const data = {};

    if (username !== undefined) {
        data.username = username;
    }

    if (avatarUrl !== undefined) {
        data.avatarUrl = avatarUrl;
    }

    if (bio !== undefined) {
        if (bio && bio.length > 160) {            
            throw new Error('BIO_TOO_LONG');
        }
        data.bio = bio;
    }

    try {        
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarUrl: true },
        });
        
        const updatedUser = await prisma.user.update({
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
 
        if (
            avatarUrl !== undefined && 
            currentUser?.avatarUrl && 
            currentUser.avatarUrl !== avatarUrl
        ) {            
            if (currentUser.avatarUrl.includes('res.cloudinary.com')) {
                try {                   
                    // Extract the publicId from url: https://res.cloudinary.com/cloud_name/image/upload/v12345/abcdefg123.png
                    const urlParts = currentUser.avatarUrl.split('/');
                    const fileWithExtension = urlParts[urlParts.length - 1]; // abcdefg123.png                    

                    const publicId = fileWithExtension.split('.')[0]; // abcdefg123

                    await cloudinary.uploader.destroy(publicId);

                } catch (error) {                    
                    console.error('Failed to remove old avatar from Cloudinary:', error);
                }
            }
        }

        return updatedUser;

    } catch (error) {
        // Prisma error code P2002 - Unique constraint failed       
        if (error.code === 'P2002') {
            throw new Error('USERNAME_TAKEN');
        }

        throw error;
    }
};

export const getUsersNameAndAvatar = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            avatarUrl: true,
        },
        orderBy: {
            username: 'asc',
        },
    });
};