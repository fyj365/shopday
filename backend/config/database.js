const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB database connected with Host : ${con.connection.host}`);
    })
}

module.exports = connectDatabase 