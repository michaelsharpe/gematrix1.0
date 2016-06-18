const Webpack = require('webpack');
const path = require('path');
const nodeMdulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public','build');
const mainPath = path.resolve(__dirname, 'app', 'main.js');

const config = {

  // Make sure errors in console map to the correct file
  // and line number
  devTool: 'eval-source-map',
  entry: [

    // Hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath
  ],
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: nodeMdulesPath,
        query: {
          'presets': ['react', 'es2015', 'stage-0']
        }
      },

      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },

  // Manually add the Hot Replacement plugin when running from Node
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
