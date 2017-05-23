const webpackMerge = require('webpack-merge');
const commonPartial= require('./config/webpack.common');
const clientPartial = require('./config/webpack.client');
const serverPartial = require('./config/webpack.server');

const isDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1;

module.exports = function (envOptions, webpackOptions) {
  const isProd = !!envOptions.production;
  const isClient = isDevServer || !!envOptions.client;
  const options = { isProd: isProd, isClient: isClient };

  const clientConfig = webpackMerge({}, commonPartial(options), clientPartial(options));
  const serverConfig = webpackMerge({}, commonPartial(options), serverPartial(options));

  if (!isProd) {
    // In development we do seperate builds for server and client
    if (isClient) {
      return clientConfig;
    } else {
      return serverConfig;
    }
  } else {
    return [
      clientConfig,
      serverConfig
    ];
  }
};
