import 'dotenv/config';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');       
    };

    if (!process.env.JWT_ACCESS_EXPIRATION) {
        throw new Error('JWT_ACCESS_EXPIRATION is not defined');       
    };

    return jwt.sign(
        {
            sub: user.id,            
            username: user.username,
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
    );
};

export default generateToken;