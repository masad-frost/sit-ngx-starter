import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'sit-home',
  styleUrls: ['./home.component.scss'],
  template: `<h3 class="title">HOME PAGE</h3>`,
})
export class HomeComponent {
  constructor() {
  }
}
