import * as messageService from '../services/message.js';

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