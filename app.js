const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const config = require('./config.js');

// APP CONFIG
const app = express();
// Allow cors
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGOOSE
mongoose.Promise = Promise;
mongoose.connect(config.database);

// Serve static files from /public (should ideally be overriden by nginx)
// On the production server, this is handled by nginx.
if (process.env.NODE_ENV === ('development' || 'test')) {
  app.use('/', express.static(`${ __dirname }/../public`));
}

// ROUTES
const numberRoutes = require('./routes/number.routes');

app.use('/', [
  numberRoutes
]);

// Basic error handling for now
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Dev stack trace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
