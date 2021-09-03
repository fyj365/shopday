const express = require('express')
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error');

const User = require('./models/user');
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use(cookieParser());

//import all routes
const products = require('./routes/product');
const users = require('./routes/auth');


app.use('/api/v1', products);
app.use('/api/v1', users);

app.get('/api/v1', async function (req, res) {
    console.log('Cookies: ', req.cookies)
    const token = req.cookies.jwtToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    const user =  await User.findById(decoded.id);
    console.log(user.name);

    res.send('Hello World!')
})

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app 