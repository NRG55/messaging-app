import { ChatService } from '../services/chat.service.js';

export const ChatController = {
    async createDirectChat(req, res, next) {
        try {
            const senderId = req.user.id;            
            const { recipientId } = req.body;

            const directChat = await ChatService.getOrCreateDirectChat(senderId, recipientId);

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
            const creatorId = req.user.id;
            const { chatName, chatMembersIds } = req.body;

            const groupChat = await ChatService.createGroupChat(creatorId, chatName, chatMembersIds);

            return res.status(201).json({
                success: true,
                data: groupChat,
            });

        } catch (error) {
            next(error);
        }
    },

    async getUserChats(req, res, next) {
        try {
            const userId = req.user.id;

            const userChats = await ChatService.getUserChats(userId);

            return res.status(200).json({
                success: true,
                data: userChats,
            });

        } catch (error) {
            next(error);
        }
    },
};