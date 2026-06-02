import authService from '../services/auth.js'

const register = async (req, res) => {

    try {
        const userData = await authService.register(req.body);
        
        res.status(200).json({
            message: "User created successfully",
            ...userData // { user: {}, token: "" }           
        });

    } catch (error) {
        res.status(400).json({ errors: [{ msg: error.message }] });
    };
};

export default { register };