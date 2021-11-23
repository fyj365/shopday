const express = require('express')
const router = express.Router();
const {isAuthenticatedUser} = require('../middlewares/auth');
const {activePayment, sendStripeAPIkey} = require('../controllers/paymeController')

router.route('/pay').post(isAuthenticatedUser, activePayment)
router.route('/apikey').get(isAuthenticatedUser, sendStripeAPIkey)

module.exports = router