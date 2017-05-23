import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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
    ]),
  ],
  declarations: [AppComponent, HomeComponent],
  exports: [AppComponent],
})
export class AppModule {
}
