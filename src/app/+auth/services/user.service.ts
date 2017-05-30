import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '../../helpers/http.service';

@Injectable()
export class UserService {
  private currentUser: User;

  constructor(private http: HttpClient) {
  }

  public createUsers(user): Promise<User> {
    return this.http.post('/register/', user)
      .then((data) => {
        return data.user;
      })
      .catch(this.handleError);
  }

  public login(username, password): Promise<any> {
    return this.http.post('/login/', {username, password}).then((data) => {
      this.currentUser = new User(false, data.user);
      return this.currentUser;
    }).catch(this.handleError);
  }

  public getUser(): Promise<any> {
    if (this.currentUser) {
      // cached
      Promise.resolve(this.currentUser);
    } else {
      return this.http.post('/get-user/').then((data) => {
        this.currentUser = new User(false, data.user);
        return this.currentUser;
      }).catch(this.handleError);
    }
  }

  public logout() {
    this.http.post('/logout/').catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
