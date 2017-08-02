const webpackMerge = require('webpack-merge');
const commonPartial= require('./config/webpack.common');
const clientPartial = require('./config/webpack.client');
const serverPartial = require('./config/webpack.server');

const hostIp = process.env.HOST_IP || 'localhost:3000';
const apiUrl = process.env.API_URL || 'http://' + hostIp + '/api';
const isProd = process.env.NODE_ENV === 'production';
port = process.env.PORT || 3000;

module.exports = function (envOptions, webpackOptions) {
  envOptions = envOptions || {};
  const options = {
    isProd: isProd,
    hostIp: hostIp,
    apiUrl: apiUrl,
    port: 3000
  };

  console.log(
    'Use the operations repo to run this or add the required vars before your script\n',
    '|=======================================================|\n',
    '| HOST_IP defaults to localhost:3000                    |\n',
    '| API_URL defaults to http://HOST_IP/api                |\n',
    '| PORT defaults to 3000                                 |\n',
    '| NODE_ENV defaults to development                      |\n',
    '| NO_SSR defaults to false                              |\n',
    '|_______________________________________________________|'
  );

  const clientConfig = webpackMerge({}, commonPartial(options), clientPartial(options));
  const serverConfig = webpackMerge({}, commonPartial(options), serverPartial(options));

  if (process.env.NO_SSR || envOptions.client) {
    return [clientConfig];
  } else if (envOptions.server) {
    return [serverConfig];
  } else {
    return [clientConfig, serverConfig];
  }
};
