import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation.utils.js';

export const MessageValidator = {
    sendMessage: [
        body('text')
            .trim()
            .isString()
            .withMessage('Message must be a valid string.'),

        body().custom((value, { req }) => {
            const hasText = req.body.text && req.body.text.trim().length > 0;
            const hasImage = req.file !== undefined;

            if (!hasText && !hasImage) {
                throw new Error('Message cannot be empty. Please provide text or an image attachment.');
            }

            return true;
        }),
            
        handleValidationErrors,
    ],
};