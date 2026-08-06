import { ChatService } from '../services/chat.service.js';

export const ChatController = {
    async createDirectChat(req, res) {
        try {
            const senderId = req.user.id;            
            const { recipientId } = req.body;

            if (!recipientId) {
                return res.status(400).json({ error: 'Recipient ID is required.' });
            }

            if (senderId === recipientId) {
                return res.status(400).json({ error: 'Sender and recipient IDs cannot be identical.' });
            }

            const chat = await ChatService.getOrCreateDirectChat(senderId, recipientId);

            return res.status(200).json(chat);

        } catch (error) {
            console.error('createDirectChat controller error:', error);

            return res.status(500).json({ error: 'Failed to initialize direct chat.' });
        }
    },
};