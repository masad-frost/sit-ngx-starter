import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '../../helpers/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CookieService } from '../../helpers/cookie.service';

@Injectable()
export class AuthService {
  private userSubject = new BehaviorSubject<User>(new User({}));

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public get user$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public register(firstName, lastName, username, email, password, repeatPassword): Promise<void> {
    return this.http
      .post('/register/', { firstName, lastName, username, email, password, repeatPassword })
      .then(userData => this.setUser(new User(userData)))
      .catch(this.handleError);
  }

  public login(username, password, rememberMe): Promise<void> {
    return this.http
      .post('/login/', { username, password, rememberMe })
      .then(userData => this.setUser(new User(userData), rememberMe))
      .catch(this.handleError);
  }

  public logout(): Promise<void> {
    return this.http
      .post('/logout/')
      .then(() => this.setUser(new User({})))
      .catch(this.handleError);
  }

  public resetPassword(value) {
    // TODO
    return Promise.resolve(true);
  }

  public confirmResetPassword(value, userId, resetToken) {
    // TODO
    return Promise.resolve(true);
  }

  public loadUser(forceReload?: boolean): Promise<void> {
    const cookieUser = this.cookieService.getCookie('user');

    if (forceReload || !cookieUser) {
      return this.fetchUser();
    }

    const user = new User(JSON.parse(cookieUser));
    this.setUser(user);
    return Promise.resolve();
  }

  public isLoggedIn(): boolean {
    const user = this.userSubject.getValue();
    return user && user.isLoggedIn();
  }

  private fetchUser() {
    return this.http
      .get('/get-user/')
      .then(userData => this.setUser(new User(userData)))
      .catch(this.handleError);
  }

  private setUser(user: User, rememberMe?: boolean) {
    this.userSubject.next(user);
    if (this.isLoggedIn()) {
      const expireDays = rememberMe ? 90 : 0;
      this.cookieService.setCookie('user', JSON.stringify(user), { path: '/', expireDays });
    } else {
      this.cookieService.deleteCookie('user');
    }
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
