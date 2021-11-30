const ErrorHandler  = require('../utils/errorHandler')
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   
    if(process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err.statusCode,
            stack: err.stack,
            errMessage: err.message + "dev",
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
        //handle Mongooese duplicate key errors
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error  = new ErrorHandler(message, 400)
        }
        //Handling wrong JWT error
        if(err.name === 'JsonWebTokenError') {
            const message = 'Json web token is invalid, try again';
            error  = new ErrorHandler(message, 400)
       }
        //Handling Expired JWT error
        if(err.name === 'TokenExpiredError') {
            const message = `Json web token is expired at ${err.expiredAt}, try again`  ;
            error  = new ErrorHandler(message, 400)
        }
        res.status(error.statusCode).json({
            success: false,
            errMessage: error.message + "prod"|| 'Internal Error',
        })
    }
}