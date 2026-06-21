import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            errors: [{ msg: 'Session expired or missing. Please login again.' }], 
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);        

        req.user = {
            id: decodedToken.sub,
            username: decodedToken.username,
        };

        next();
        
    } catch (error) {
        console.error('verifyToken error:', error.message);

        return res.status(401).json({ 
            success: false, 
            errors: [{ msg: 'Session expired or missing. Please login again.' }], 
        });
    }
}