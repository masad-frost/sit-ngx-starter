require('zone.js/dist/zone-node');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT;
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

app.listen(process.env.PORT, () =>
  console.log('Started server on port' + process.env.PORT)
);
