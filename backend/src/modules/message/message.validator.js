import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation.utils.js';

export const MessageValidator = {
    sendMessage: [
        body('text')
            .trim()
            .notEmpty().withMessage('Message cannot be empty.'),
            
        handleValidationErrors,
    ],
};