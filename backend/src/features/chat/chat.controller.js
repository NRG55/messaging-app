import { ChatService } from './chat.service.js';

export const ChatController = {
    async getOrCreateDirectChat(req, res, next) {
        try {
            const currentUserId = req.user.id;
            const { targetUserId } = req.body;

            const directChat = await ChatService.getOrCreateDirectChat(currentUserId, targetUserId);

            return res.status(200).json({
                success: true,
                data: directChat,
            });

        } catch (error) {
            next(error);
        }
    },

    async createGroupChat(req, res, next) {
        try {
            const currentUserId = req.user.id;
            const { chatName, chatMembersIds } = req.body;
            const avatarUrl = req.file ? req.file.path : null;

            const groupChat = await ChatService.createGroupChat(currentUserId, chatName, chatMembersIds, avatarUrl);

            return res.status(201).json({
                success: true,
                data: groupChat,
            });

        } catch (error) {
            next(error);
        }
    },

    async getChat(req, res, next) {
        try {
            const { chatId } = req.params;
            const currentUserId = req.user.id;

            const chat = await ChatService.getChatById(chatId, currentUserId);

            return res.status(200).json({
                success: true,
                data: chat,
            });

        } catch (error) {
            next(error);
        }
    },

    async getUserChats(req, res, next) {
        try {
            const currentUserId = req.user.id;

            const userChats = await ChatService.getUserChats(currentUserId);

            return res.status(200).json({
                success: true,
                data: userChats,
            });

        } catch (error) {
            next(error);
        }
    },

    async addGroupMembers(req, res, next) {
        try {
            const currentUserId = req.user.id;
            const { chatId } = req.params;
            const { newMembersIds } = req.body;

            const updatedChat = await ChatService.addGroupMembers(chatId, currentUserId, newMembersIds);

            return res.status(200).json({
                success: true,
                data: updatedChat,
            });

        } catch (error) {
            next(error);
        }
    },
};