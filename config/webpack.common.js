const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(options) {
  return {
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['@ngtools/webpack'].concat(
            options.isProd ? [] : '@angularclass/hmr-loader'
          ),
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [path.resolve(__dirname, '..', 'src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [path.resolve(__dirname, '..', 'src', 'styles')]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
          include: [path.resolve(__dirname, '..', 'src', 'styles')]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          }),
          include: [path.resolve(__dirname, '..', 'src', 'styles')]
        },
        {
          test: /\.html$/,
          use: ['raw-loader'],
          exclude: [path.resolve(__dirname, '..', 'src', 'index.html')]
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          options.isProd ? 'production' : 'development'
        ),
        'process.env.PORT': JSON.stringify(options.port),
        'process.env.HOST_IP': JSON.stringify(options.hostIp)
      })
    ]
  };
};
