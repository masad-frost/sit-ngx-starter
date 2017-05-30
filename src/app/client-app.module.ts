import { NgModule, ApplicationRef } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule],
})
export class ClientAppModule {
  constructor(public appRef: ApplicationRef) {
  }

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
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
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
