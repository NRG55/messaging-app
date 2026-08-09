import { body, validationResult } from 'express-validator';

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array(), 
        });
    }
    next();
};

export const AuthValidator = {
    login: [
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .bail()
            .isLength({ min: 1, max: 16 }).withMessage('Username must be between 1 and 16 characters.'),

        body('password')
            .trim()
            .notEmpty().withMessage('Password cannot be empty.')
            .bail()
            .isLength({ min: 5, max: 16 }).withMessage('Password must be between 5 and 16 characters.'),

        handleValidationErrors,
    ],

    register: [    
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required')
            .bail()
            .isLength({ min: 1, max: 16 }).withMessage('Username must be between 1 and 16 characters.'),        

        body('password')
            .trim()
            .notEmpty().withMessage('Password cannot be empty.')
            .bail()
            .isLength({ min: 5, max: 16 }).withMessage('Password must be between 5 and 16 characters.'),
            
        body('passwordConfirmation')
            .trim()
            .notEmpty().withMessage('Please confirm your password.')
            .bail()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match. Please verify your entries!');
                }
                return true;
            }),

        handleValidationErrors,
    ],
};

export const MessageValidator = {
    sendMessage: [
        body('text')
            .trim()
            .notEmpty().withMessage('Message cannot be empty.'),
            
        handleValidationErrors,
    ],
};

export const ChatValidator = {
    createDirectChat: [
        body('recipientId')
            .trim()
            .notEmpty().withMessage('Recipient ID is required.')
            .bail()
            .isUUID().withMessage('Invalid Recipient ID format.'),
       
        body('recipientId').custom((recipientId, { req }) => {
            if (req.user?.id === recipientId) {
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