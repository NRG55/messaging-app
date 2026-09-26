import { Router } from 'express';
import { getMe, updateProfile, getProfile, userController } from './user.controller.js';
import verifyToken from '../../middleware/verifyToken.js';

const router = Router();

router.get('/me', verifyToken, getMe);
router.get('/profile/:id', getProfile);
router.get('/all', verifyToken, userController.getAllExceptCurrentUser);
router.patch('/', verifyToken, updateProfile);

export default router;