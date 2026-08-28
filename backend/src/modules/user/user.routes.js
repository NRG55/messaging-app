import { Router } from 'express';
import { getMe, updateProfile, getProfile, getAllUsers, userController } from './user.controller.js';
import verifyToken from '../../middleware/verifyToken.js';

const router = Router();

router.post('/heartbeat', verifyToken, userController.updateUserLastSeen);
router.get('/me', verifyToken, getMe);
router.get('/profile/:id', getProfile);
router.get('/all', getAllUsers);
router.patch('/', verifyToken, updateProfile);

export default router;