import bcrypt from 'bcrypt';
import prisma from '../../config/prisma.js';
import { generateToken } from '../../utils/token.utils.js';

export const AuthService = {
    async register({ username, password }) {
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        
        if (existingUser) {
            throw new Error('USERNAME_TAKEN');
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
    },

    async login({ username, password }) {
        const userData = await prisma.user.findUnique({
            where: { username },
        });

        if (!userData) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);

        if (!isPasswordMatch) {
            throw new Error('INVALID_CREDENTIALS');
        }

        const user = {
            id: userData.id,
            username: userData.username,
            avatarUrl: userData.avatarUrl,
            bio: userData.bio || '',
        };

        const token = generateToken(user.id, user.username);

        return { user, token };
    },
};