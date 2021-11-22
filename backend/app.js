const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error');

const path = require('path')

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//import all routes
const products = require('./routes/product');
const users = require('./routes/auth');
const orders =require('./routes/order');

app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', orders);


if(process.env.NODE_ENV == 'PRODUCTION' ) {
    app.get('/', (req, res) => {
        app.use(express.static(path.join(__dirname, '../frontend/build')))
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app 