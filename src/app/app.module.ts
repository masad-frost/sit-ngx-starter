import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthService } from './+auth/services/auth.service';
import { HttpClient } from './helpers/http.service';
import { CookieService } from './helpers/cookie.service';

// polyfills
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

export function createTranslateLoader(http: Http) {
  // todo: replace API_URL by s3 bucket url on beta and prod envs
  return new TranslateHttpLoader(http, `http://${process.env.HOST_IP}/assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'account', loadChildren: './+auth/auth.module#AuthModule' },
      { path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule' },
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http],
      },
    }),
  ],
  declarations: [AppComponent, HomeComponent],
  exports: [AppComponent],
  providers: [AuthService, HttpClient, CookieService],
})
export class AppModule {}
