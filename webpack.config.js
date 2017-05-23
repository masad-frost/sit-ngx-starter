const webpackMerge = require('webpack-merge');
const commonConfig= require('./config/webpack.common');
const clientConfig = require('./config/webpack.client');
const serverConfig = require('./config/webpack.server');

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = function (envOptions, webpackOptions) {
  const clientMerged = webpackMerge({}, commonConfig, clientConfig);
  const serverMerged = webpackMerge({}, commonConfig, serverConfig);

  if (isDevServer || envOptions.client) {
    return clientMerged;
  } else if (envOptions.server) {
    return serverMerged;
  } else {
    return [
      clientMerged,
      serverMerged
    ];
  }
};
