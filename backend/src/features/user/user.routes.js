import { Router } from 'express';
import verifyToken from '../../middleware/verifyToken.js';
import { upload } from '../../middleware/upload.js';
import { UserValidator } from './user.validator.js';
import { UserController } from './user.controller.js';

const router = Router();

router.use(verifyToken);

router.get('/me', UserController.getMe);
router.get('/all', UserController.getAllExceptCurrentUser);
router.patch('/', upload.single('avatar'), UserValidator.updateProfile, UserController.updateProfile);

export default router;