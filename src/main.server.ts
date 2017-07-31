import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import cookieParser from 'cookie-parser';

// types
import { Request, Response } from 'express';

enableProdMode();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: ServerAppModule,
  })
);
app.set('view engine', 'html');
app.set('views', 'src');

app.get('/*', (req: Request, res: Response) => {
  res.render('../dist/client/index', { req, res });
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`); // tslint:disable-line
});
