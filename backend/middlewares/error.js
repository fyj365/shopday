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
        res.status(err.statusCode).json({
            success: false,
            errMessage: error.message || 'Internal Error',
        })
    }
}