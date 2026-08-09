import { ChatService } from '../services/chat.service.js';

export const ChatController = {
    async createDirectChat(req, res, next) {
        try {
            const senderId = req.user.id;            
            const { recipientId } = req.body;

            const chat = await ChatService.getOrCreateDirectChat(senderId, recipientId);

            return res.status(200).json(chat);

        } catch (error) {
            next(error);
        }
    },

    async createGroupChat(req, res, next) {
        try {
            const creatorId = req.user.id;
            const { chatName, chatMembersIds } = req.body;

            const groupChat = await ChatService.createGroupChat(creatorId, chatName, chatMembersIds);

            return res.status(201).json(groupChat);

        } catch (error) {
            next(error);
        }
    },
};