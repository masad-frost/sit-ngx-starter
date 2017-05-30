import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sit-home',
  styleUrls: ['./home.component.scss'],
  template: `<h3 class="title">{{ 'Hello' | translate}}</h3>`,
})
export class HomeComponent {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
