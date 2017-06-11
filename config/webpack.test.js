const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // We're using this instead of @ngtools/webpack because it
          // plays nicely with multiple entry points which is the case
          // for testing (every .spec.ts is its own entry)
          {
            loader: 'awesome-typescript-loader',
            query: {
              inlineSourceMap: true,
              compilerOptions: {
                removeComments: true
              }
            },
          },
          'angular2-template-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
      'process.env.API_URL': JSON.stringify('http://testurl.com/api'),
      'process.env.PORT': JSON.stringify('3000'),
      'process.env.HOST_IP': JSON.stringify('http://testurl.com')
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '..', 'src')
    )
  ]
};
