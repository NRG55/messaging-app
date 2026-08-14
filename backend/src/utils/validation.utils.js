import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errorsResult = validationResult(req);
    
    if (errorsResult.isEmpty()) {
        return next();
    }

    // .mapped() converts the errors into a key-value object. Example: { username: { type: "field", value: "...", msg: "...", path: "username", location: "body" }
    const rawErrorsObject = errorsResult.mapped();
    const errors = {};

    // clean up the object - only contains the key name and the message
    for (const key in rawErrorsObject) {
        errors[key] = rawErrorsObject[key].msg;
    }   
    
    const validationError = new Error('VALIDATION_FAILED');

    validationError.statusCode = 400;
    validationError.errors = errors;

    next(validationError);
};