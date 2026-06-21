import * as userService from '../services/user.js';

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