import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './+auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'sit-app-root',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div id="app-wrapper">
      <header class="header">
        <h1>SIT Angular2 Universal Starter</h1>
        <nav>
          <a routerLink="/">Home</a>
          <ng-container *ngIf="(authService.user$ | async)?.isLoggedIn(); else loggedOut">
            <span>{{(authService.user$ | async)?.username}}</span>
            <a (click)="authService.logout()">Logout</a>
          </ng-container>
          <ng-template #loggedOut>
            <a routerLink="/account/login">Login</a>
            <a routerLink="/account/register">Register</a>
          </ng-template>
        </nav>
      </header>
      <main class="main">
        <router-outlet></router-outlet>
      </main>
      <footer class="footer">
        footer
      </footer>
    </div>
  `,
})
export class AppComponent {
  constructor(public authService: AuthService, public translate: TranslateService) {
    authService.loadUser();
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
