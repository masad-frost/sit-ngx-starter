import {Component, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.scss'],
  template: `<h3 class="title">HOOME PAGE</h3>`
})
export class HomeComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
}
