import { UserService } from './user.service.js';

export const UserController = {
    async getMe(req, res, next) {
        try {
            const currentUserId = req.user.id; 
            
            const currentUser = await UserService.findById(currentUserId);

            return res.status(200).json({
                success: true,
                data: currentUser,
            });

        } catch (error) {
            next(error); 
        }
    },

    async getAllExceptCurrentUser(req, res, next) {
        try {
            const currentUserId = req.user.id;

            const users = await UserService.getAllExceptCurrentUser(currentUserId);

            return res.status(200).json({
                success: true,
                data: users,
            });

        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const userId = req.user.id;
            const { username, bio } = req.body;

            const updateData = { username, bio };
            console.log(req.file);
            if (req.file) {
                updateData.avatarUrl = req.file.path;
            }

            const updatedUser = await UserService.updateProfile(userId, updateData);

            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully!',
                data: updatedUser,
            });

        } catch (error) {
            next(error);
        }
    },
};