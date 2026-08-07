import { MessageService } from '../services/message.service.js';

export const MessageController = {
    async sendMessage(req, res, next) {
        try {
            const { chatId } = req.params;
            const senderId = req.user.id;
            const { text, imageUrl } = req.body;

            const message = await MessageService.createMessage(chatId, senderId, text, imageUrl);
            
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

export const createMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { chatId } = req.params;
        const senderId = req.user.id;        

        const message = await messageService.createMessage({ text, chatId, senderId });

        return res.status(201).json(message);

    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const userId = req.user.id;
       
        const messages = await messageService.getMessages(chatId, userId);

        return res.status(200).json(messages);

    } catch (error) {
        next(error);
    }
};