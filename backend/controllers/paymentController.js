const catchAsyncError = require('../middlewares/catchAsynErrors')

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(`${process.env.STRIPE_SECRETE_KEY}`);



//active payment=> /api/v1/pay
exports.activePayment= catchAsyncError(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment'}
      });
      
      res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

//send stripe api key => /api/v1/apikey
exports.sendStripeAPIkey= catchAsyncError(async (req, res, next) => {
      res.status(200).json({
        stripeAPIkey: process.env.STRIPE_TEST_PUBLISHABLE_KEY
    })

})