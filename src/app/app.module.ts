import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './+auth/auth.module';
import { HttpClient } from './helpers/http.service';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'sit-universal',
    }),
    CommonModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule'},
      {path: 'account', loadChildren: './+auth/auth.module#LoginModule'},
    ]),
    LoginModule,
  ],
  declarations: [AppComponent, HomeComponent],
  exports: [AppComponent],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    HttpClient,
  ],
})
export class AppModule {
}
