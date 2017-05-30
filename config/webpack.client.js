const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

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
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        }
      })
    ]);
  } else {
    config.plugins = config.plugins.concat([
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '..', 'dist', 'client')
      }),
      new webpack.HotModuleReplacementPlugin()
    ]);

    config.devServer = {
      compress: true,
      contentBase: './src',
      port: '3001',
      hot: true,
      inline: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true
    };
  }
  return config
};
