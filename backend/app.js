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