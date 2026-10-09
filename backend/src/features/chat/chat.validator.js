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
            .customSanitizer((value) => {
                try {
                    return JSON.parse(value);

                } catch {
                    return [];
                }
            })
            .isArray().withMessage('Group members IDs must be provided in a valid array structure.'),
            
        handleValidationErrors,
    ],

    addGroupMembers: [
        body('newMembersIds')
            .isArray({ min: 1 })
            .withMessage('Group members IDs array is required and cannot be empty.'),
        handleValidationErrors,
    ],
};