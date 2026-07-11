import { Router } from 'express';
import { getChat, createChat } from '../controllers/chat.js';
import { createMessage, getMessages } from '../controllers/message.js';
import verifyToken from '../middleware/verifyToken.js';
import { messageValidator } from '../middleware/validators.js';

const router = Router();

router.get('/', verifyToken, getChat);
router.post('/', verifyToken, createChat);

router.get('/:chatId/messages', verifyToken, getMessages);
router.post('/:chatId/messages', verifyToken, messageValidator, createMessage);

export default router;