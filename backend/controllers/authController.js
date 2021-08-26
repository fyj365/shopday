const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsynErrors');

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

    const token= user.getJwtToken();
    
    res.status(200).json({
        success: true,
        token
    })
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
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }
    const token = user.getJwtToken();
    res.status(200).json({success: true, token})
})