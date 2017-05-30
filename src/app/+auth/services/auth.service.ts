import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '../../helpers/http.service';

@Injectable()
export class AuthService {
  public user: User;
  public isLoggedIn = false;

  constructor(private http: HttpClient) {}

  public register(user): Promise<User> {
    return this.http.post('/register/', user)
      .catch(this.handleError);
  }

  public login(username, password): Promise<User> {
    return this.http.post('/login/', {username, password})
      .then((data) => {
        this.user = new User(false, data.user);
        this.isLoggedIn = true;
        return this.user;
      })
      .catch(this.handleError);
  }

  public logout() {
    this.http.post('/logout/')
      .then(() => this.isLoggedIn = false)
      .catch(this.handleError);
  }

  public loadUser(forceReload: boolean): Promise<User> {
    if (this.user && !forceReload) {
      // cached
      return Promise.resolve(this.user);
    } else {
      return this.http.post('/get-user/')
        .then((data) => {
          this.user = new User(false, data.user);
          this.isLoggedIn = true;
          return this.user;
        })
        .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
