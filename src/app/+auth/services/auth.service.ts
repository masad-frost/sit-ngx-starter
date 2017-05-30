import { Injectable, Injector } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class AuthService {
  public user: any;
  public observableLoggedin = new BehaviorSubject(null);
  private loggedIn = false;
  private token = '';
  private usersUrl = 'user/';  // URL to web API

  constructor(private router: Router, private injector: Injector) {
    if (localStorage.getItem('id_token') !== null &&
      localStorage.getItem('id_token') !== 'false') {
      this.setToken(localStorage.getItem('id_token'));
    }
  }

  public setToken(token) {
    if (token) {
      this.token = token;
      this.loggedIn = true;
      localStorage.setItem('id_token', token);
    }
  }

  public getToken() {
    return this.token;
  }

  public resetAuth() {
    localStorage.removeItem('id_token');
    this.token = '';
    this.user = new User();
    this.loggedIn = false;
  }

  public logout() {
    this.resetAuth();
  }
}
