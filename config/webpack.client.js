const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(options) {
  const config = {
    name: 'client',
    entry: {
      vendor: path.resolve(__dirname, '..', './src/vendor.ts'),
      polyfills: path.resolve(__dirname, '..', './src/polyfills/polyfills.client.ts'),
      main: path.resolve(__dirname, '..', './src/main.client.ts')
    },
    output: {
      path: path.resolve(__dirname, '..', 'dist', 'client'),
      filename: options.isProd ? '[name].[chunkhash].client.bundle.js' : '[name].client.bundle.js',
      chunkFilename: options.isProd ? '[name].[id].[chunkhash].client.chunk.js' : '[name].[id].client.chunk.js',
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
      }),
      new CopyWebpackPlugin([
        { from: 'src/assets' }
      ]),
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(options.apiUrl)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['vendor']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfills']
      })
    ],
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
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
      }),
      new webpack.NormalModuleReplacementPlugin(
        /@angularclass(\\|\/)hmr/,
        path.resolve(__dirname, 'hmr.prod.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /@angular(\\|\/)upgrade/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /@angular(\\|\/)compiler/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /@angular(\\|\/)platform-browser-dynamic/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /dom(\\|\/)debug(\\|\/)ng_probe/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /dom(\\|\/)debug(\\|\/)by/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /src(\\|\/)debug(\\|\/)debug_node/,
        path.resolve(__dirname, 'empty.js')
      ),
      new webpack.NormalModuleReplacementPlugin(
        /src(\\|\/)debug(\\|\/)debug_renderer/,
        path.resolve(__dirname, 'empty.js')
      ),
    ]);
  } else {
    config.entry.main = ['webpack-hot-middleware/client', config.entry.main];
    config.plugins = config.plugins.concat([
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, '..', 'dist', 'client')
      }),
      new webpack.HotModuleReplacementPlugin()
    ]);

    config.devServer = {
      compress: true,
      contentBase: './dist/client',
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
