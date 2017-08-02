import './polyfills/polyfills.client';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClientAppModule } from './app/client-app.module';
import { bootloader } from '@angularclass/hmr';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(ClientAppModule);
}

bootloader(main);
