import prisma from '../../config/prisma.js';

const BASE_CHAT_INCLUDE = {
    members: {
        include: {
            user: {
                select: { 
                    id: true, 
                    username: true, 
                    avatarUrl: true,
                    lastSeen: true,
                },
            },
        },
    },
};

export const ChatService = {
    async getOrCreateDirectChat(currentUserId, targetUserId) {
        const sortedIds = [currentUserId, targetUserId].sort();
        const chatHash = `direct:${sortedIds[0]}_${sortedIds[1]}`;
        
        let chat = await prisma.chat.findUnique({
            where: { hash: chatHash },
            include: BASE_CHAT_INCLUDE,
        });

        if (!chat) {
            try {
                chat = await prisma.chat.create({
                    data: {
                        type: 'DIRECT',
                        hash: chatHash,
                        members: {
                            create: [{ userId: currentUserId }, { userId: targetUserId }],
                        },
                    },
                    include: BASE_CHAT_INCLUDE,
                });
            
            } catch (error) {
                // If another request created this chat just before this, catch the unique constraint failure (P2002) and fetch the newly created chat instead.
                if (error.code === 'P2002') {
                    chat = await prisma.chat.findUnique({
                        where: { hash: chatHash },
                        include: BASE_CHAT_INCLUDE,
                    });
                   
                } else {
                    throw error;
                }
            }
        }

        return normalizeChat(chat, currentUserId); 
    },

    async createGroupChat(creatorId, chatName, chatMembersIds) {
        const uniqueChatMemberIds = Array.from(new Set([creatorId, ...chatMembersIds]));
        const members = uniqueChatMemberIds.map((userId) => ({ userId }));

        const chat = await prisma.chat.create({
            data: {
                type: 'GROUP',
                name: chatName,
                members: {
                    create: members,
                },
            },
            include: BASE_CHAT_INCLUDE,
        });

        return normalizeChat(chat, creatorId);
    },

    async getChatById(chatId, userId) {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
            include: BASE_CHAT_INCLUDE,
        });

        if (!chat) {
            throw new Error('CHAT_NOT_FOUND');
        }

        const isMember = chat.members.some(member => member.userId === userId);

        if (!isMember) {
            throw new Error('CHAT_ACCESS_DENIED');
        }

        return normalizeChat(chat, userId);
    },

    async getUserChats(userId) {
        const chats = await prisma.chat.findMany({
            where: {
                members: {
                    some: { userId },
                },
            },
            include: {
                ...BASE_CHAT_INCLUDE,
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    include: {
                        sender: { select: { username: true } },
                    },
                },
            },
        });

        const normalizedChats = chats.map(chat => {
            const normalizedChat = normalizeChat(chat, userId);
            const rawLatestMessage = chat.messages?.[0] || null;

            const latestMessage = rawLatestMessage ? {
                id: rawLatestMessage.id,
                text: rawLatestMessage.text,
                senderName: rawLatestMessage.sender.username,
                createdAt: rawLatestMessage.createdAt,
            } : null;

            const lastActivity = rawLatestMessage ? new Date(rawLatestMessage.createdAt) : new Date(chat.createdAt);

            return {
                ...normalizedChat,
                latestMessage,
                lastActivity,
            };

        });        

        return normalizedChats.sort((a, b) => b.lastActivity - a.lastActivity);
    },
};

function normalizeChat(chat, currentUserId) {
    let chatName = chat.name;
    let avatarUrl = chat.avatarUrl || null;
    let isOnline = false;
    let lastSeen = null;

    const ONLINE_GAP_CHECK_MS = 3.5 * 60 * 1000;
    const now = Date.now();

    if (chat.type === 'DIRECT') {
        const otherMember = chat.members?.find(member => member.userId !== currentUserId);

        if (otherMember?.user) {
            chatName = otherMember.user.username;
            avatarUrl = otherMember.user.avatarUrl;
            lastSeen = otherMember.user.lastSeen;
            isOnline = (now - new Date(lastSeen).getTime()) < ONLINE_GAP_CHECK_MS;
        }
    }

    const membersWithOnlineStatus = [];

    if (chat.members) {
        chat.members.forEach(member => {
            if (!member.user) {
                return;
            } 

            const memberLastSeen = member.user.lastSeen;
            const memberOnlineStatus = (now - new Date(memberLastSeen).getTime()) < ONLINE_GAP_CHECK_MS;

            membersWithOnlineStatus.push({
                ...member,
                user: {
                    ...member.user,
                    isOnline: memberOnlineStatus,
                },
            });
        });
    }

    return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        avatarUrl,
        createdAt: chat.createdAt,
        isOnline,
        lastSeen,
        members: membersWithOnlineStatus,
    };
}