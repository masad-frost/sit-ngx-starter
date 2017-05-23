const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = {
  entry: path.resolve(__dirname, '..', './src/client/main.ts'),
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'client'),
    filename: 'client.js',
    publicPath: '/assets/'
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
      output: path.resolve(__dirname, '..', 'dist'),
      inject: 'head'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new AotPlugin({
      tsConfigPath: path.resolve(__dirname, '..', './src/client/tsconfig.json'),
      skipCodeGeneration: true
    }),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    compress: true,
    contentBase: './src',
    port: '3000',
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: 'localhost'
  }
};
