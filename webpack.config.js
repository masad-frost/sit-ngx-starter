const webpackMerge = require('webpack-merge');
const commonPartial= require('./config/webpack.common');
const clientPartial = require('./config/webpack.client');
const serverPartial = require('./config/webpack.server');

const hostIp = process.env.HOST_IP;
const apiUrl = process.env.API_URL;
const isProd = process.env.NODE_ENV === 'production';

module.exports = function (envOptions, webpackOptions) {
  const options = {
    isProd: isProd,
    hostIp: hostIp,
    apiUrl: apiUrl,
  };

  for (const optKey of Object.keys(options)) {
    if (typeof options[optKey] === 'undefined') {
      console.error(
        'Use the operations repo to run this or add the required vars before your script\n',
        '|=======================================================|\n',
        '| HOST_IP (required) i.e. http://www.sit-mena.com       |\n',
        '| API_URL (required) i.e http://api.sit-mena.com        |\n',
        '| NODE_ENV (optional) defaults to development           |\n',
        '| NO_SSR (optional) disables SSR                        |\n',
        '|_______________________________________________________|'
      );
      throw new Error(        'Environment variable for ' + optKey + ' is not set.')
    }
  }

  const clientConfig = webpackMerge({}, commonPartial(options), clientPartial(options));
  const serverConfig = webpackMerge({}, commonPartial(options), serverPartial(options));

  if (process.env.NO_SSR) {
    return [clientConfig];
  } else {
    return [clientConfig, serverConfig];
  }
};
