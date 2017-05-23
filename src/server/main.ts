import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { Request, Response } from 'express'; // types
import { ServerAppModule } from './server-app.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
const proxy = require('express-http-proxy');

enableProdMode();

const app = express();
const port = process.env.PORT;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));
app.set('view engine', 'html');
app.set('views', 'src');

if (process.env.NODE_ENV === 'development') {
  // In production we will be using a cdn to serve statics.
  // In development we pass the request to webpack-dev-server (for hmr and other goodies)
  app.use('/assets', proxy(`localhost:${process.env.PORT + 1}/assets/`, {
    preserveHostHdr: true,
    proxyReqPathResolver: function(req) {
      return `/assets/${req.url}`;
    }
  }));
}

app.get('/*', (req: Request, res: Response) => {
  res.render('../dist/client/index', {
    req: req,
    res: res
  });
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
