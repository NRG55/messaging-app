import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import { SessionController } from './session.controller.js';

const router = Router();

router.post('/heartbeat', verifyToken, SessionController.recordUserActivity);

export default router;