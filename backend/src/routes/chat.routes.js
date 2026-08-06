import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { ChatController } from '../controllers/chat.controller.js';

const router = Router();

router.post('/direct', verifyToken, ChatController.createDirectChat);

export default router;