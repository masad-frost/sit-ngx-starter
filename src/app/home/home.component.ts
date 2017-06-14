import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sit-home',
  styleUrls: ['./home.component.scss'],
  template: `<h3 class="title">{{ 'Hello' | translate}}</h3>`,
})
export class HomeComponent {
  public test = 1;
  constructor(private translate: TranslateService) {
    this.test = 2;
  }

  public testFunction(x) {
    this.test = x;
  }
}
