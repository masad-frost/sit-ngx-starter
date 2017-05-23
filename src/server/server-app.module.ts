import { NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef } from '@angular/core';
import { AppComponent } from '../app/app.component';
import { AppModule } from '../app/app.module';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    ServerModule,
    AppModule
  ]
})
export class ServerAppModule {}
