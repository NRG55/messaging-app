export default function errorHandler(err, req, res, _next) {    
    let statusCode = 500;
    let clientMessage = 'Internal server error. Please try again later.';
    
    switch (err.message) {
        case 'USERNAME_TAKEN':
            statusCode = 400; // Bad Request
            clientMessage = 'Username already exists. Please try another one!';
            break;
            
        case 'INVALID_CREDENTIALS':
            statusCode = 401; // Unauthorized
            clientMessage = 'Invalid username or password.';
            break;

        case 'UNAUTHORIZED':
            statusCode = 401;
            clientMessage = 'Session expired or missing. Please login again.';
            break;

        case 'INVALID_USER_ID':
            statusCode = 400;
            clientMessage = 'Invalid user ID.';
            break;
       
        case 'USER_NOT_FOUND':
            statusCode = 404; // Not Found
            clientMessage = 'User does not exist.';
            break;

        case 'BIO_TOO_LONG':
            statusCode = 400;
            clientMessage = 'Bio cannot be longer than 160 characters.';
            break;

        default:
            console.error('Unexpected Server Error:', err);
    }
    
    return res.status(statusCode).json({
        success: false,
        errors: [{ msg: clientMessage }],
    });
}