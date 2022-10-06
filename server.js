const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
const morgan = require('morgan');

// routers
const router = require('./routes/router.js');
const db = require('./utils/db-connection.js');

// swagger api docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

dotenv.config();

const port = process.env.NODE_PORT;
const host = process.env.APP_URL;
const app = express();

//* connect to database
db();

app
  .use(helmet()) //* use helmet
  .use(morgan('dev')) //* use morgan
  .use(compression()) //* use compression to gzip responses
  .use(cors()); //* use cors for CORS error

//* use json to read data from body
app.use(express.json());
//* use public folder to serve static files
app.use(express.static('public'));
//* add decumentation to the api
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// use v1Router to handle requests to /api
app.use('/api', router);

//* 404 if this endpoint not found
app.all('*', (req, res, next) => {
  res.status(404).send(`${req.url} -- 404 Not Found!`);
});

//* handle all errors
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    res.status(500).send({
      status: false,
      error: err.message,
    });
  } else {
    res.status(500).send({
      status: false,
      error: '500 Internal Server Error',
    });
  }
});

//* start the server
app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
