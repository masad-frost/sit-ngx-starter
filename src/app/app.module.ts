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
      {path: 'account', loadChildren: './+auth/auth.module#AuthModule'},
    ]),
  ],
  declarations: [AppComponent, HomeComponent],
  exports: [AppComponent],
  providers: [],
})
export class AppModule {
}
