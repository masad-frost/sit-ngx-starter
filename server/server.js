require('zone.js/dist/zone-node');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT || 3000;
if (!port) {
  throw new Error('Please specify the port to start the server on');
}

const app = express();

app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(require('./prod.js'));
} else {
  app.use(require('./dev.js'));
}

app.listen(port, () =>
  console.log('Started server on port' + process.env.PORT)
);
