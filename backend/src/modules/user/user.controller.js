import { userService, getUserProfile, updateUserProfile, getUsersNameAndAvatar } from './user.service.js';

export const userController = {
    async recordUserActivity(req, res, next) {
        try {
            const id = req.user?.id;

            if (!id) {
                throw new Error('UNAUTHORIZED');
            }

            await userService.recordUserActivity(id);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    },
};

export const getMe = async (req, res, next) => {
    try {       
        const id = req.user?.id;

        if (!id) {
            throw new Error('UNAUTHORIZED');
        }

        const profile = await getUserProfile(id);
        
        if (!profile) {
            throw new Error('USER_NOT_FOUND');
        }

        return res.status(200).json(profile);

    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
       
        if (!id || id.length !== 36) {
            throw new Error('INVALID_USER_ID');
        }
        
        const userProfile = await getUserProfile(id);

        return res.status(200).json(userProfile);

    } catch (error) {        
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const userProfile = req.body;

        if (!userId) {
            throw new Error('UNAUTHORIZED');
        }

        const updatedUser = await updateUserProfile(userId, userProfile);

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully!',
            user: updatedUser,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {       
        const users = await getUsersNameAndAvatar();
      
        return res.status(200).json(users);

    } catch (error) {
        next(error);
    }
};