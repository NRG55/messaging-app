import { Router } from 'express';
import { updateProfile } from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.patch('/', verifyToken, updateProfile);

export default router;