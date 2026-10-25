import { MessageService } from './message.service.js';

export const MessageController = {
    async sendMessage(req, res, next) {
        try {
            const { chatId } = req.params;
            const { text } = req.body;
            const senderId = req.user.id;
            const imageUrl = req.file ? req.file.path : null;

            const message = await MessageService.createMessage({
                chatId, 
                senderId, 
                text: text || '',
                imageUrl, 
            });
            
            return res.status(201).json(message);

        } catch (error) {
            next(error);
        }        
    },

    async getMessages(req, res, next) {
        try {
            const { chatId } = req.params;
            const userId = req.user.id;
           
            const messages = await MessageService.getChatMessages(chatId, userId);
            
            return res.status(200).json(messages);

        } catch (error) {
            next(error);
        }
    },
};