const User = require('../models/user');
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsynErrors');

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const cookies = req.cookies;
    console.log(`{Cookies: , ${cookies.jwtToken}`);
    if(!cookies.jwtToken) {
        return next(new ErrorHandler('login first to access this resource', 401)); 
    }
    const decoded = jwt.verify(cookies.jwtToken, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
})