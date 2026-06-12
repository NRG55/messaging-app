import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import generateToken from '../utils/generateToken.js';

export const register = async ({ username, password }) => {
    const originalUsername = username.trim();
    const lowercaseUsername = originalUsername.toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: { normalizedUsername: lowercaseUsername }
    });

    if (existingUser) {
        throw new Error('Username already exists. Please try another one!');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username: originalUsername,
            normalizedUsername: lowercaseUsername,
            password: hashedPassword
        },
        select: {
            id: true,
            username: true
        }
    });

    const token = generateToken(user);

    return { user, token };
};

const login = async ({ username, password }) => {   
    const lowercaseUsername = username.trim().toLowerCase();
   
    const userData = await prisma.user.findUnique({
        where: { normalizedUsername: lowercaseUsername }
    });
   
    if (!userData) {
        throw new Error('Invalid username or password');
    };

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid username or password');
    };
    
    const { password: _, normalizedUsername: __, ...user } = userData;

    const token = generateToken(user);

    return { user, token };
};

export default { register, login };
