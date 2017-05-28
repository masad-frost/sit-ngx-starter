const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = function(options) {
  const config = {
    entry: path.resolve(__dirname, '..', './src/main.client.ts'),
    output: {
      path: path.resolve(__dirname, '..', 'dist', 'client'),
      filename: options.isProd ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
      chunkFilename: options.isProd ? '[name].[id].[chunkhash].chunk.js' : '[name].[id].chunk.js',
      publicPath: '/assets/'
    },
    target: 'web',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
        inject: 'head',
        alwaysWriteToDisk: true
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new AotPlugin({
        tsConfigPath: path.resolve(__dirname, '..', './src/tsconfig.client.json'),
        skipCodeGeneration: !options.isProd
      })
    ]
  };

  if (options.isProd) {

  } else {
    // new HtmlWebpackHarddiskPlugin({
    //   outputPath: path.resolve(__dirname, '..', 'dist', 'client')
    // }),
    // new HotModuleReplacementPlugin()
    // devServer: {
    //   compress: true,
    //   contentBase: './src',
    //   port: '3000',
    //   hot: true,
    //   inline: true,
    //   historyApiFallback: true,
    //   host: '0.0.0.0',
    //   disableHostCheck: true
    // }
  }
  return config
};
