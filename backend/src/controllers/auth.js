import authService from '../services/auth.js'

export const register = async (req, res) => {
    try {
        const data = await authService.register(req.body);
        
        res.status(201).json({
            success: true,
            message: "User created successfully",
            token: data.token,
            user: {
                id: data.user.id,
                username: data.user.username
            }           
        });

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    };
};

export const login = async(req, res) => {
    try {
        const data = await authService.login(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: data.token,
            user: {
                id: data.user.id,
                username: data.user.username,
            }
        });

    } catch (error) {
        res.status(401).json({ errors: [{ msg: error.message }] });
    };
};