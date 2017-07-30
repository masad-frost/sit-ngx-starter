import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

export function getRequest() {
  // the Request object only lives on the server
  return { cookie: document.cookie };
}

export function getResponse() {
  // the Response object only lives on the server
  return {};
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'sit-universal',
    }),
    AppModule,
  ],
  providers: [
    {
      provide: REQUEST,
      useFactory: getRequest,
    },
    {
      provide: RESPONSE,
      useFactory: getResponse,
    },
  ],
})
export class ClientAppModule {
  constructor(public appRef: ApplicationRef) {}

  public hmrOnInit(store) {
    if (!store) {
      return;
    }
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    // change detection
    this.appRef.tick();
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
