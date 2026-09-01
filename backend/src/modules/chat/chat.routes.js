import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import { ChatValidator } from './chat.validator.js';
import { ChatController } from './chat.controller.js';
import { MessageValidator } from '../message/message.validator.js';
import { MessageController } from '../message/message.controller.js';

const router = Router();

router.get('/', verifyToken, ChatController.getUserChats);

router.post('/direct', verifyToken, ChatValidator.getOrCreateDirectChat, ChatController.getOrCreateDirectChat);
router.post('/group', verifyToken, ChatValidator.createGroupChat, ChatController.createGroupChat);

router.get('/:chatId', verifyToken, ChatController.getChat);

router.post('/:chatId/messages', verifyToken, MessageValidator.sendMessage, MessageController.sendMessage);
router.get('/:chatId/messages', verifyToken, MessageController.getMessages);

export default router;