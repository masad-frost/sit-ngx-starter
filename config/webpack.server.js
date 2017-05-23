const path = require('path');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = {
  entry: path.resolve(__dirname, '..', './src/server/main.ts'),
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'server'),
    filename: 'server.js'
  },
  target: 'node',
  plugins: [
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, '..', './src/server/tsconfig.json'),
      skipCodeGeneration: true
    })
  ]
};
