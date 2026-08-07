import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { ChatController } from '../controllers/chat.controller.js';
import { MessageController } from '../controllers/message.controller.js';
import { MessageValidator } from '../middleware/validators.js';

const router = Router();

router.post('/direct', verifyToken, ChatController.createDirectChat);

router.post('/:chatId/messages', verifyToken, MessageValidator.send, MessageController.sendMessage);
router.get('/:chatId/messages', verifyToken, MessageController.getMessages);

export default router;