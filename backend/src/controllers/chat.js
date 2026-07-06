import * as chatService from '../services/chat.js';

export const getChat = async (req, res) => {
    try {
        const { recipientId } = req.query;
        const userId = req.user.id;

        if (!recipientId) {
            return res.status(400).json({ error: 'Recipient ID is required.' });
        }

        const chat = await chatService.getChat(userId, recipientId);
        
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found.' });
        }

        return res.status(200).json(chat);

    } catch (error) {
        console.error('getChat controller error:', error);

        return res.status(500).json({ error: 'Internal server error getting chat.' });
    }
};

export const createChat = async (req, res) => {
    try {
        const { recipientId } = req.body;
        const userId = req.user.id;

        if (!recipientId) {
            return res.status(400).json({ error: 'Recipient ID is required to create a chat.' });
        }

        const newChat = await chatService.createChat(userId, recipientId);

        return res.status(201).json(newChat);

    } catch (error) {
        console.error('createChat controller error:', error);

        return res.status(500).json({ error: 'Internal server error creating chat.' });
    }
};