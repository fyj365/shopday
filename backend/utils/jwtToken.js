// create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
    // create JWT token
    const token = user.getJwtToken();
    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + parseInt(`${process.env.COOKIE_EXPIRE_TIME}`) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
     res.status(statusCode).cookie('jwtToken', token, options).json({
         success: true,
         token,
         user
     })
}

module.exports = sendToken;