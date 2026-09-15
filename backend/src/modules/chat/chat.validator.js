import { body } from 'express-validator';
import { handleValidationErrors } from '../../utils/validation.utils.js';

export const ChatValidator = {
    getOrCreateDirectChat: [
        body('targetUserId')
            .trim()
            .notEmpty().withMessage('Recipient ID is required.')
            .bail()
            .isUUID().withMessage('Invalid Recipient ID format.'),
       
        body('targetUserId').custom((targetUserId, { req }) => {
            if (req.user?.id === targetUserId) {
                throw new Error('Sender and recipient IDs cannot be identical.');
            }
            return true;
        }),

        handleValidationErrors,
    ],

    createGroupChat: [
        body('chatName')
            .trim()
            .notEmpty().withMessage('Group chat name is required.'),
            
        body('chatMembersIds')
            .isArray({ min: 1 }).withMessage('At least one participant ID must be provided.'),
            
        handleValidationErrors,
    ],
};