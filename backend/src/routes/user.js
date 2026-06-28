import { Router } from 'express';
import { updateProfile, getProfile, getAllUsers } from '../controllers/user.js';
import verifyToken from '../middleware/verifyToken.js';

const router = Router();

router.get('/profile/:id', verifyToken, getProfile);
router.get('/all', verifyToken, getAllUsers);
router.patch('/', verifyToken, updateProfile);

export default router;