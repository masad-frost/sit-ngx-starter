const path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = function(options) {
  return {
    entry: path.resolve(__dirname, '..', './src/main.server.ts'),
    output: {
      path: path.resolve(__dirname, '..', 'dist', 'server'),
      filename: 'server.js'
    },
    target: 'node',
    plugins: [
      new AotPlugin({
        tsConfigPath: path.resolve(__dirname, '..', './src/tsconfig.server.json'),
        skipCodeGeneration: true
      })
    ]
  };
};
