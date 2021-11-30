const app  = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dtij13bgx', 
    api_key: '455372113137732', 
    api_secret: 'tEnR13jMls9DNjtd2Biw3s6EpdE',
    secure: true
  });

// handle uncaught exceptions
// process.on('uncaughtException', err => {
//     console.log(`ERROR: ${err.message}`)
//     console.log('shutting down due to uncaught exception')
//     process.exit(1)
// })


// setting up config file
dotenv.config({path: 'backend/config/config.env'})

// Connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode` );
});

//handle unhandled promise error
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})