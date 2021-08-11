require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
};

module.exports = { connect };
