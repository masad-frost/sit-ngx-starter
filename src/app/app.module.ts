import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './+auth/auth.module';
import { HttpClient } from './helpers/http.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: Http) {
  // todo: replace API_URL by s3 bucket url on beta and prod envs
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    LoginModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http],
      },
    }),
  ],
  declarations: [AppComponent, HomeComponent],
  exports: [AppComponent],
  providers: [],
})
export class AppModule {
}
