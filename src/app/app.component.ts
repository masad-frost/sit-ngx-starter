import { Component } from '@angular/core';
@Component({
  selector: 'sit-app-root',
  template: `
    <h1>SIT Angular2 Universal Starter</h1>
    <a routerLink="/account/login">Login</a>
    <a routerLink="/account/register">Register</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
