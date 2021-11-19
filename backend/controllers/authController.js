const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsynErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
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

//forget password => /api/v1/password/forget
exports.forgetPassword = catchAsyncError( async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforesave: false})

    // create reset password url
    // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `your password reset token is as follow: \n\n ${resetUrl}, \n\n if you have not requested this email. then ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'shopDay password recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforesave: false});

        return new ErrorHandler(error.message, 501);
    }
})
//reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async(req, res, next) => {
    //hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const  user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user) {
        return next(new ErrorHandler(' Password reset token is invalid or has been expired', 400))
    }
    
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    //set up new password
    user.password = req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)
})
// Get currently logged in user detials => /api/v1/me
exports.getUserProfile = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


//update/ change password => /api/v1/password/update
exports.updatePassword = catchAsyncError( async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select('+password');
        //check previous user password 
        const isMathced = await user.comparePassword(req.body.oldPassword);
        if(!isMathced) {
            return next(new ErrorHandler('old password is incorrect'));
        }
        user.password = req.body.newPassword;
        await user.save();
        sendToken(user, 200, res);
    }catch(e){
        console.log(e.message);
    }
}) 

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // update avatar: TODO
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})
// logtout user => /api/v1/logout
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

//admin routes

//get all users => /api/v1/admin/users
exports.allUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})
//get  user detail=> /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncError( async(req, res, next) => {
    const  user = await User.findById(req.params.id)

    if(!user) {
        return next( new ErrorHandler(`User doesnt found  with id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})
//update user => /api/v1/admin/user/:id
exports.updateUser = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})
//delete user detail=> /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError( async(req, res, next) => {
    const  user = await User.findById(req.params.id)

    if(!user) {
        return next( new ErrorHandler(`User doesnt found  with id ${req.params.id}`))
    }
    await user.remove();
    // remove avator TODO
    res.status(200).json({
        success: true,
    })
})