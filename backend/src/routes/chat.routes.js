import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { ChatValidator } from '../middleware/validators/chat.validator.js';
import { ChatController } from '../controllers/chat.controller.js';
import { MessageValidator } from '../middleware/validators/message.validator.js';
import { MessageController } from '../controllers/message.controller.js';

const router = Router();

router.post('/direct', verifyToken, ChatValidator.createDirectChat, ChatController.createDirectChat);
router.post('/group', verifyToken, ChatValidator.createGroupChat, ChatController.createGroupChat);

router.post('/:chatId/messages', verifyToken, MessageValidator.sendMessage, MessageController.sendMessage);
router.get('/:chatId/messages', verifyToken, MessageController.getMessages);

export default router;