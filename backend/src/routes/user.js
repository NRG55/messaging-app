import { Router } from 'express';
import { getMe, updateProfile, getProfile, getAllUsers } from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/me', verifyToken, getMe);
router.get('/profile/:id', getProfile);
router.get('/all', getAllUsers);
router.patch('/', verifyToken, updateProfile);

export default router;