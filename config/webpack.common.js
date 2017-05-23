const path = require('path');
const webpack = require('webpack');

module.exports = function (options) {
  return {
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['@angularclass/hmr-loader', '@ngtools/webpack']
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.html$/,
          use: ['raw-loader']
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ]
  };
};
