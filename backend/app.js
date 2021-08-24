const express = require('express')
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json());

//import all routes
const products = require('./routes/product')

app.use('/api/v1', products)

app.get('/api/v1', function (req, res) {
    res.send('Hello World!')
  })

// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app 