import * as userService from '../services/user.js';

export const getProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
       
        if (!id || id.length !== 36) {
            throw new Error('INVALID_USER_ID');
        }
        
        const userProfile = await userService.getUserProfile(id);

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

        const updatedUser = await userService.updateUserProfile(userId, userProfile);

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully!',
            user: updatedUser,
        });

    } catch (error) {
        next(error);
    }
};