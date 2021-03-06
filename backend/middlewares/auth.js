const User = require('../models/user');
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsynErrors');

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const cookies = req.cookies;
    // console.log(`{isAuthenticatedUser() Cookies: , ${cookies.jwtToken}`);
    if(!cookies.jwtToken) {
        return next(new ErrorHandler('login first to access this resource', 401)); 
    }
    const decoded = jwt.verify(cookies.jwtToken, `${process.env.JWT_SECRET}`);
    req.user = await User.findById(decoded.id);
    next();
})

//handling user roles
exports.authorizeRoles = (...roles) => { 
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}