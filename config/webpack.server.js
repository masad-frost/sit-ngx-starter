const path = require('path');
const webpack = require('webpack');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const nodeExternals = require('webpack-node-externals');

module.exports = function(options) {
  return {
    name: 'server',
    entry: path.resolve(__dirname, '..', './src/main.server.ts'),
    output: {
      path: path.resolve(__dirname, '..', 'dist', 'server'),
      filename: '[name].js',
      libraryTarget: 'commonjs-module'
    },
    target: 'node',
    externals: [nodeExternals({
      whitelist: [
        /^@angular\/animations/,
        /^@angular\/common/,
        /^@angular\/compiler/,
        /^@angular\/core/,
        /^@angular\/forms/,
        /^@angular\/http/,
        /^@angular\/platform\-browser/,
        /^@angular\/platform\-browser\-dynamic/,
        /^@angular\/platform\-server/,
        /^@angular\/router/,
        /^@angularclass\/hmr/,
        /^@angularclass\/hmr\-loader/,
        /^@nguniversal\/express\-engine/,
        /^@ngx\-translate\/core/,
        /^@ngx\-translate\/http-loader/,
        /^intl/,
        /^ng2\-validation/,
        /^rxjs/,
        /^xhr2/,
        /^zone.js/,
      ]
    })],
    plugins: [
      new AotPlugin({
        tsConfigPath: path.resolve(__dirname, '..', './src/tsconfig.server.json'),
        skipCodeGeneration: true
      }),
      new webpack.DefinePlugin({
        // TODO make sure this is handled in prod
        'process.env.API_URL': JSON.stringify('http://server:8000')
      }),
    ]
  };
};
