const webpack = require('webpack');

// Postcss plugins
const autoprefixer = require('autoprefixer');

// Paths
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'client', 'index');
const clientPath = path.resolve(__dirname, 'client');

const config = {
  devTool: 'inline-eval-cheap-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    'react-hot-loader/patch',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    root: ['client'],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: clientPath,
        exclude: nodeModulesPath
      },

      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }
    ]
  },
  postcss: () => [autoprefixer],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
