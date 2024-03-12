const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async() => {
 await mongoose
    .connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@attendance.a67enty.mongodb.net/event_management_system?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Connected To DB ${conn.connection.host}`);
    })
    .catch((err) => {
      process.exit(1);
    });
};

module.exports = connectToDB;
