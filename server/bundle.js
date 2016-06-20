const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config');
const path = require('path');
const fs = require('fs');

const mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = function () {
  // Fire up webpack and pass in the config
  let bundleStart = null;
  const compiler = webpack(webpackConfig);

  // Communicate bunlding to terminal
  compiler.plugin('compile', () => {
    console.log('Compiling...');
    bundleStart = Date.now();
  });

  // Also include when it finishes Compiling
  compiler.plugin('done', () => {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  const bundler = new WebpackDevServer(compiler, {
    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',

    // Configure hot replacement
    hot: true,

    // Terminal configuation
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8080, 'localhost', () => {
    console.log('Bundling the Project, sir. Please wait...');
  });
};
