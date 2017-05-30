import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '../../helpers/http.service';
@Injectable()
export class UserService {
  private usersUrl = 'user/';  // URL to web API
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
      // return this.currentUser;
    }).catch(this.handleError);

  }

  public getUser(): Promise<any> {
    if (this.currentUser) {
      Promise.resolve(this.currentUser);
    } else {
      return this.http.post('/get-user/').then((data) => {
        this.currentUser = new User(false, data.user);
        return this.currentUser;
      }).catch(this.handleError);
    }
  }

  public logout() {
    this.http.post('/logout/', {}).catch(this.handleError);
  }

  public whoami() {
    this.http.get('/whoami/').catch(this.handleError);
  }

  public resetPassword(vals): Promise<any> {
    return this.http.get('api-auth/reset/', vals)
      .then((data) => {
        return data;
      })
      .catch(this.handleError);

  }

  public confirmResetPassword(vals, uid, token): Promise<any> {
    return this.http.post('api-auth/confirm-reset/' + uid + '/' + token + '/', vals)
      .then((data) => {
        return data;
      })
      .catch(this.handleError);

  }

  public confirmEmail(token): Promise<any> {
    return this.http.get('api-auth/confirm-email/' + token + '/', {})
      .then((data) => {
        return data;
      })
      .catch(this.handleError);
  }

  public getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .then((data) => {
        return data.json();
        // this.get_user_api();
      })
      .catch(this.handleError);
  }

  public updateUser(user: User, data): Promise<User> {
    return this.http.patch(this.usersUrl + user.id.toString() + '/', data)
      .then((result) => {
        user = result;
        return user;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
