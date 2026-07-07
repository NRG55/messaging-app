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