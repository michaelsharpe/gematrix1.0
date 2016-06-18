const webpack = require('webpack');

// Postcss plugins
const autoprefixer = require('autoprefixer');

// Paths
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'index');
const appPath = path.resolve(__dirname, 'app');

const config = {
  devTool: 'inline-eval-cheap-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    root: ['app'],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: appPath,
        exclude: nodeModulesPath
      },

      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  postcss: () => [autoprefixer],
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
