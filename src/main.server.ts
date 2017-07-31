import 'reflect-metadata';
import 'rxjs/Rx';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import * as fs from 'fs';
import { ServerAppModule } from './app/server-app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

let setupDone = false;
function setupEngine(app) {
  app.engine(
    'html',
    ngExpressEngine({
      bootstrap: ServerAppModule,
    })
  );
  app.set('view engine', 'html');
  app.set('views', 'src');
  setupDone = true;
}

export default options => (req, res, next) => {
  if (process.env.NODE_ENV === 'development' || !setupDone) {
    // We want to setup the engine only one time in production
    setupEngine(req.app);
  }

  res.render('../dist/client/index', { req, res });
};
