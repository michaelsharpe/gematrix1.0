const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const config = require('../config/server.js');

// APP CONFIG
const app = express();

app.set('app-name', config.appName);
app.set('assets-path', config.assetsPath);

app.use(cors());
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MONGOOSE
mongoose.Promise = Promise;
mongoose.connect(config.db.server);

// Serve static files from /public (should ideally be overriden by nginx)
// On the production server, this is handled by nginx.
if (process.env.NODE_ENV === ('development' || 'test')) {
  app.use('/', express.static(`${ __dirname }/../public`));
}

// ROUTES
const numeralRoutes = require('./routes/numeral.routes');


/**
 * Webpack bundler
 */
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

if (process.env.NODE_ENV === 'development') {
  const bundle = require('../server/bundle');
  bundle();

  // Forward all requests to /build to the webpack server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});


app.use('/', [
  numeralRoutes
]);

// Error handlers.
const {
  unauthorized,
  forbidden,
  badRequest,
  unprocessable,
  genericError,
  pageNotFound
} = require('./middleware/error_middleware');

app.use([
  unauthorized,
  forbidden,
  badRequest,
  unprocessable,
  genericError,
  pageNotFound
]);


module.exports = app;