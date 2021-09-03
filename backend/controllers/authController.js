const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsynErrors');
const sendToken = require('../utils/jwtToken');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res, next) => {
    const {name, email, password} = req.body;
    const user =  await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'public id',
            url: 'url'
        }
    });

    sendToken(user, 200, res)
})

// login a user => /api/v1/login
exports.loginUser = catchAsyncError( async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered by user
    if (!email || !password ) {
        return next (new ErrorHandler('Please enter email & password', 400));
    }
    //find user in database
    const user = await ( await User.findOne( { email}).select('+password'))
    if(!user) {
        // 401 => unauthenticated user
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    sendToken(user, 200, res)
})
exports.logout = catchAsyncError ( async (req, res, next) => {
    res.cookie('jwtToken', null, {
        expires: new Date(Date.now()),
        httponly: true
    })
    res.status(200).json({
        success: true,
        message: 'logged out '
    })
})