import authService from '../services/auth.js';

export const register = async (req, res, next) => {
    try {
        const data = await authService.register(req.body);
        
        res.cookie('authToken', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });        
        
        res.status(201).json({
            success: true,
            message: 'Registration and login successful!',
            user: data.user,
        });

    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        const data = await authService.login(req.body);

        res.cookie('authToken', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: data.user,
        });

    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('authToken', {
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
};