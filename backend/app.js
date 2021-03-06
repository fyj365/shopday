const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error');

var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === undefined) require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.urlencoded({extended: false}))

const twilio = require('twilio')
const dotenv = require('dotenv')
dotenv.config({path: 'backend/config/config.env'})


//twilio setting
const twilio_accountId = process.env.twilio_accountId
const twilio_authToken = process.env.twilio_authToken

const twilioClient = new twilio(twilio_accountId, twilio_authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const responseMessage = response.message();

//mount router messages
app.use('/messages', async (req, res, next) => {
    //send whatsapp message 
    console.log(req.body)
    await twilioClient.messages
    .create({
        body: `Hello from Node, received: ${req.body.Body} at: ${new Date()}.  ${JSON.stringify(req.body)}`,
        to: `whatsapp:${req.body.To}`, // Text this number
        from: `whatsapp:${req.body.From}`, // From a valid Twilio number
    })
    .then((message) => console.log('sent message id:' + message.sid));
  
    responseMessage.body(`Hello World!${JSON.stringify(req.body)}`);
    console.log(responseMessage.toString());

    response.redirect('https://demo.twilio.com/welcome/sms/');
    res.setHeader('content-type', 'text/xml');
    res.send(responseMessage);
    next()
})
//import all routes
const products = require('./routes/product');
const users = require('./routes/auth');
const orders =require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', orders);
app.use('/api/v1', payment)

const root = require("path").join(__dirname, '../frontend/build');
app.use(express.static(root));
if(process.env.NODE_ENV == 'PRODUCTION' ) {
    app.get('*', (req, res) => {
        // app.use(express.static(path.join(__dirname, '../frontend/build')))
        // res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
        res.sendFile("index.html", {root})

    })
}

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app 