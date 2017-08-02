const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../webpack.config.js')();

const router = express.Router();
const compiler = webpack(config);

router.use(
  webpackDevMiddleware(compiler, {
    publicPath: 'assets',
    serverSideRender: true
  })
);
router.use(
  webpackHotMiddleware(
    compiler.compilers.find(function(compiler) {
      return compiler.name === 'client'
    })
  )
);

if (process.env.NO_SSR) {
  router.use('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', './dist/client/index.html'));
  });
} else {
  router.use(webpackHotServerMiddleware(compiler));
}

module.exports = router;
