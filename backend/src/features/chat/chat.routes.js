import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import { ChatValidator } from './chat.validator.js';
import { ChatController } from './chat.controller.js';
import { MessageValidator } from '../message/message.validator.js';
import { MessageController } from '../message/message.controller.js';
import { upload } from '../../middleware/upload.js';

const router = Router();

router.use(verifyToken);

router.get('/', ChatController.getUserChats);

router.post('/direct', ChatValidator.getOrCreateDirectChat, ChatController.getOrCreateDirectChat);
router.post('/group', upload.single('chatAvatar'), ChatValidator.createGroupChat, ChatController.createGroupChat);
router.post('/group/:chatId/members', ChatValidator.addGroupMembers, ChatController.addGroupMembers);

router.get('/:chatId', ChatController.getChat);
router.patch('/:chatId/read', ChatController.markAsRead);

router.post('/:chatId/messages', MessageValidator.sendMessage, MessageController.sendMessage);
router.get('/:chatId/messages', MessageController.getMessages);

export default router;