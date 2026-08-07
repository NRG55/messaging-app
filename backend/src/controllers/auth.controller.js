import { AuthService } from '../services/auth.service.js';

export const AuthController = {
    async register(req, res, next) {
        try {
            const data = await AuthService.register(req.body);
            
            res.cookie('token', data.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });        
            
            return res.status(201).json({
                success: true,
                message: 'Registration and login successful!',
                user: data.user,
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const data = await AuthService.login(req.body);

            res.cookie('token', data.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: data.user,
            });
        } catch (error) {
            next(error);
        }
    },

    async logout(req, res, next) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return res.status(200).json({
                success: true,
                message: 'Logged out successfully.',
            });
        } catch (error) {
            next(error);
        }
    },
};