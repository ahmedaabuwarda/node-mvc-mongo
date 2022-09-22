const mongoose = require('mongoose');
const dotenv = require('dotenv');
// configuration settings
dotenv.config();
// connect to Mongoose server
async function db() {
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    (err) => {
      if (err) {
        console.error('Error connecting to Mongoose server: ' + err);
      } else {
        console.log('Connected to Mongoose server');
      }
    }
  );
}

module.exports = db;
