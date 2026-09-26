import prisma from '../../config/prisma.js';

const userActivityMap = new Map();
const DB_WRITE_GAP_MS = 3 * 60 * 1000; // 3 minutes
const USER_INACTIVITY_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export const SessionService = {
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
                console.log(`Cleared ${removedUsersCount} inactive sessions from memory.`);
            }
        }, 30 * 60 * 1000); // 30 minutes
    },
};