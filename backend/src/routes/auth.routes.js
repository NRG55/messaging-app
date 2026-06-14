import express from 'express';
import { register, login } from '../controllers/auth.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

export default router;