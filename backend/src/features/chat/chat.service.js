import prisma from '../../config/prisma.js';
import { SessionService } from '../session/session.service.js';

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

        return formatChat(chat, currentUserId); 
    },

    async createGroupChat(currentUserId, chatName, chatMembersIds, avatarUrl) {
        const uniqueChatMemberIds = Array.from(new Set([currentUserId, ...chatMembersIds]));
        const members = uniqueChatMemberIds.map((userId) => ({ userId }));

        const chat = await prisma.chat.create({
            data: {
                type: 'GROUP',
                name: chatName,
                avatarUrl,
                members: {
                    create: members,
                },
            },
            include: BASE_CHAT_INCLUDE,
        });

        return formatChat(chat, currentUserId);
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

        return formatChat(chat, userId);
    },

    async getUserChats(currentUserId) {
        const chats = await prisma.chat.findMany({
            where: {
                members: {
                    some: { userId: currentUserId },
                },
            },
            include: {
                ...BASE_CHAT_INCLUDE,
                messages: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        sender: { select: { username: true } },
                    },
                },
            },
        });

        const formattedChats = chats.map(chat => formatChat(chat, currentUserId));

        return formattedChats.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
    },

    async updateLastRead(chatId, userId) {
        const isMember = await prisma.chatMember.findUnique({
            where: {
                userId_chatId: { userId, chatId },
            },
        });

        if (!isMember) {
            throw new Error('CHAT_ACCESS_DENIED');
        }

        return await prisma.chatMember.update({
            where: {
                userId_chatId: {
                    userId,
                    chatId,
                },
            },
            data: {
                lastRead: new Date(),
            },
        });
    },

    async addGroupMembers(chatId, currentUserId, newMembersIds) {
        const chat = await prisma.chat.findUnique({
            where: { id: chatId, type: 'GROUP' },
            include: BASE_CHAT_INCLUDE,
        });

        if (!chat) {
            throw new Error('CHAT_NOT_FOUND');
        }
        
        const isCurrentUserMember = chat.members.some(member => member.userId === currentUserId);
        
        if (!isCurrentUserMember) {
            throw new Error('CHAT_ACCESS_DENIED');
        }
       
        const existingMemberIds = chat.members.map(member => member.userId);
        const uniqueNewMembersIds = Array.from(new Set(newMembersIds)).filter(id => !existingMemberIds.includes(id));

        if (uniqueNewMembersIds.length === 0) {
            return formatChat(chat, currentUserId);
        }

        const newMembers = uniqueNewMembersIds.map(userId => ({ userId }));
        
        const updatedChat = await prisma.chat.update({
            where: { id: chatId },
            data: {
                members: {
                    create: newMembers,
                },
            },
            include: BASE_CHAT_INCLUDE,
        });

        return formatChat(updatedChat, currentUserId);
    },
};

function formatChat(chat, currentUserId) {
    let chatName = chat.name;
    let avatarUrl = chat.avatarUrl || null;
    let isOnline = false;
    let lastSeen = null;

    if (chat.type === 'DIRECT') {
        const otherMember = chat.members?.find(member => member.userId !== currentUserId);

        if (otherMember?.user) {
            chatName = otherMember.user.username;
            avatarUrl = otherMember.user.avatarUrl;
            lastSeen = otherMember.user.lastSeen;
            isOnline = SessionService.isUserOnline(otherMember.user.id);
        }
    }

    const currentUser = chat.members?.find(member => member.userId === currentUserId);
    const lastReadDate = currentUser ? currentUser.lastRead : new Date(0);

    return {
        id: chat.id,
        type: chat.type,
        name: chatName,
        avatarUrl,
        createdAt: chat.createdAt,
        isOnline,
        lastSeen,
        members: formatMembersList(chat.members),
        latestMessage: formatLatestMessage(chat.messages?.[0]),
        unreadCount: countUnreadMessages(chat.messages, currentUserId, lastReadDate),
        lastActivity: chat.messages?.[0] ? new Date(chat.messages[0].createdAt) : new Date(chat.createdAt),
    };
}

function formatMembersList(membersList = []) {
    // Safety check in case user data is missing
    const validMembers = membersList.filter(member => member.user);

    return validMembers.map(member => ({
        id: member.user.id,
        username: member.user.username,
        avatarUrl: member.user.avatarUrl,
        bio: member.user.bio,
        lastSeen: member.user.lastSeen,
        joinedAt: member.createdAt,
        isOnline: SessionService.isUserOnline(member.user.id),
    }));
}

function formatLatestMessage(message = null) {
    if (message === null || message === undefined) {
        return null;
    }

    return {
        id: message.id,
        text: message.text,
        senderName: message.sender.username,
        createdAt: message.createdAt,
    };
}

function countUnreadMessages(messagesArray = [], currentUserId, lastReadDate) {
    const unreadMessages = messagesArray.filter(message => {
        const isNotMyMessage = message.senderId !== currentUserId;
        const isAfterLastReadDate = new Date(message.createdAt) > new Date(lastReadDate);

        return isNotMyMessage && isAfterLastReadDate;
    });
    
    return unreadMessages.length;
}