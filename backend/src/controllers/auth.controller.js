import { AuthService } from '../services/auth.service.js';
import { CookieUtil } from '../utils/cookie.utils.js';

export const AuthController = {
    async register(req, res, next) {
        try {
            const { token, user } = await AuthService.register(req.body);
            
            CookieUtil.setAuthCookie(res, token);        
            
            return res.status(201).json({
                success: true,
                message: 'Registration and login successful!',
                user,
            });

        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { token, user } = await AuthService.login(req.body);

            CookieUtil.setAuthCookie(res, token);
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user,
            });

        } catch (error) {
            next(error);
        }
    },

    async logout(req, res, next) {
        try {
            CookieUtil.clearAuthCookie(res);

            return res.status(200).json({
                success: true,
                message: 'Logged out successfully.',
            });
            
        } catch (error) {
            next(error);
        }
    },
};