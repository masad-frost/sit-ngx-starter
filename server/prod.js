const express = require('express');
const path = require('path');
const serverRender = require('../dist/server/main.server.bundle.js').default();

const router = express.Router();

// We're likely to be serving our assets from a cdn, but this doesn't hurt
router.use(
  '/assets',
  express.static(path.join(__dirname, '..', 'dist', 'client'))
);

if (!process.env.NO_SSR) {
  router.use(serverRender);
}

module.exports = router;
