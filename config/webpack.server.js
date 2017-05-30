const path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const nodeExternals = require('webpack-node-externals');

module.exports = function(options) {
  return {
    entry: path.resolve(__dirname, '..', './src/main.server.ts'),
    output: {
      path: path.resolve(__dirname, '..', 'dist', 'server'),
      filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    plugins: [
      new AotPlugin({
        tsConfigPath: path.resolve(__dirname, '..', './src/tsconfig.server.json'),
        skipCodeGeneration: true
      })
    ]
  };
};
