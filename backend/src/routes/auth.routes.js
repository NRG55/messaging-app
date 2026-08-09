import express from 'express';
import { AuthValidator } from '../middleware/validators/auth.validator.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', AuthValidator.register, AuthController.register);
router.post('/login', AuthValidator.login, AuthController.login);
router.post('/logout', AuthController.logout);

export default router;