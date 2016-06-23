const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackDevConfig = require('../webpack.dev.config');

const config = require('../config/client');

/**
 * Webpack bundler
 */
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/**', function (req, res) {
  res.sendFile('./index.html', { root: __dirname });
});

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
