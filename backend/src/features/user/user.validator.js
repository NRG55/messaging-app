import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation.utils.js';

export const UserValidator = {
    updateProfile: [
        body('username')
            .optional()
            .trim()
            .notEmpty().withMessage('Username cannot be empty.')
            .bail()
            .isLength({ min: 1, max: 16 }).withMessage('Username must be between 1 and 16 characters.')
            .bail()
            .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores.'),

        body('bio')
            .optional()
            .trim()
            .isLength({ max: 160 }).withMessage('Bio cannot be longer than 160 characters.'),
        
        handleValidationErrors,
    ],
};