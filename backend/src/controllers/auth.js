import authService from '../services/auth.js';

export const register = async (req, res) => {
    try {
        const data = await authService.register(req.body);
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token: data.token,
            user: {
                id: data.user.id,
                username: data.user.username,
            },           
        });

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    }
};

export const login = async(req, res) => {
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
        const isAuthError = error.message === 'Invalid username or password';
        const statusCode = isAuthError ? 401 : 500;
        const clientMessage = isAuthError ? error.message : 'Internal server error. Please try again later.';

        res.status(statusCode).json({ errors: [{ msg: clientMessage }] });
    }
};