const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

// routers
const router = require('./routes/router.js');
const db = require('./utils/db-connection.js');

dotenv.config();

const port = process.env.NODE_PORT;
const host = process.env.APP_URL;
const app = express();

//* connect to database
db();

//* use helmet
app.use(helmet());
//* use morgan
app.use(morgan('dev'));
//* use compression to gzip responses
app.use(compression());
//* use cors for CORS error
app.use(cors());
//* use json to read data from body
app.use(express.json());
//* use public folder to serve static files
app.use(express.static('public'));

// use v1Router to handle requests to /api
app.use('/api', router);

//* 404 if this endpoint not found
app.all('*', (req, res) => {
  res.status(404).send('404 Not Found!');
});

//* handle all errors
app.use((err, req, res, next) => {
  console.error(err);
  // throw new Error(err);
  // next();
  // return res.status(500).send('500 Internal Server Error!');
});

//* start the server
app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
