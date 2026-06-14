import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import generateToken from '../utils/generateToken.js';

const register = async ({ username, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });
    
    if (existingUser) {
        throw new Error('Username already exists. Please try another one!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },        
    });

    const user = {
        id: createdUser.id,
        username: createdUser.username,
        avatarUrl: createdUser.avatarUrl,
        bio: createdUser.bio || '',
    };

    const token = generateToken(user.id, user.username);

    return { user, token };
};

const login = async ({ username, password }) => {
    const userData = await prisma.user.findUnique({
        where: { username },
    });

    if (!userData) {
        throw new Error('Invalid username or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password);

    if (!isPasswordMatch) {
        throw new Error('Invalid username or password');
    }

    const user = {
        id: userData.id,
        username: userData.username,
        avatarUrl: userData.avatarUrl,
        bio: userData.bio || '',
    };

    const token = generateToken(user.id, user.username);

    return { user, token };
};

export default { register, login };