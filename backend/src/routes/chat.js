import { Router } from 'express';
import { getChat, createChat } from '../controllers/chat.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getChat);
router.post('/', verifyToken, createChat);

export default router;