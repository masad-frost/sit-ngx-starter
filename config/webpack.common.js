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
          use: ['@angularclass/hmr-loader', '@ngtools/webpack'],
          exclude: [/\.(spec|e2e)\.ts$/]
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
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.isProd ? 'production' : 'development'),
        'process.env.API_URL': JSON.stringify(options.apiUrl),
        'process.env.PORT': JSON.stringify(options.port),
        'process.env.HOST_IP': JSON.stringify(options.hostIp)
      })
    ]
  };
};
