const ErrorHandler  = require('../utils/errorHandler')
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   
    if(process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err.statusCode,
            stack: err.stack,
            errMessage: err.message,
        })
    }
    if(process.env.NODE_ENV == 'PRODUCTION') {
        let error = {...err}
        error.message  = err.message

        // Wrong Mongoose object ID error => 400 bad request
        if(err.name === 'CastError'){
            const message = `Resource not found ${err.path}`;
            error = new ErrorHandler(message, 400)
        }
        // handle Mongoose validation error => 400 bad request
        if(err.name === 'ValidationError') {
             const message = Object.values(err.errors).map(value => value.message);
             error  = new ErrorHandler(message, 400)
        }
        res.status(error.statusCode).json({
            success: false,
            errMessage: error.message || 'Internal Error',
        })
    }
}