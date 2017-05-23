import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
export const API_URL = process.env.API_URL;
@Injectable()
export class HttpClient {
  private loadersCount = 0;

  constructor(public http: Http,
              private injector: Injector,
              private router: Router) {
  }

  public get(url, data = {}) {
    url = API_URL + url;
    const headers = new Headers({'Content-Type': 'application/json'});
    const params = this.objToSearchParams(data);
    const options = new RequestOptions({headers, search: params});
    this.createAuthorizationHeader(headers);
    return this.http.get(url, options).toPromise().then((result) => {
      // this.refreshUserToken(result);
      return result.json();
    })
      .catch(this.handleError.bind(this));
  }

  public post(url, data) {
    url = API_URL + url;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, options).toPromise().then((result) => {
      this.refreshUserToken(result);
      return result.json();
    })
      .catch(this.handleError.bind(this));
  }

  public delete(url, data) {
    url = API_URL + url;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, options).toPromise().then((result) => {
      this.refreshUserToken(result);
      return result.json();
    })
      .catch(this.handleError.bind(this));
  }

  public patch(url, data) {
    url = API_URL + url;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    this.createAuthorizationHeader(headers);
    return this.http.patch(url, data, options).toPromise().then((result) => {
      this.refreshUserToken(result);
      return result.json();
    })
      .catch(this.handleError.bind(this));
  }

  public put(url, data) {
    url = API_URL + url;
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers});
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, options).toPromise().then((result) => {
      this.refreshUserToken(result);
      return result.json();
    })
      .catch(this.handleError.bind(this));
  }

  private handleError(error) {
    // // const authService = this.injector.get('penos');
    // if (error.status === 401) {
    //   const message = error.json();
    //   if (message.detail === 'Signature has expired.' || message.detail === 'User account is disabled.') {
    //     // authService.resetAuth();
    //     // const translatedPath: any = this.localize.translateRoute(['/account/login']);
    //     // this.router.navigate(translatedPath, {queryParams: {returnUrl: this.router.url}});
    //   }
    // }
    // throw error;
  }

  private refreshUserToken(response) {
    // const authService = this.injector.get('penos');
    // const token = response.headers._headers.get('data-authorization');
    // if (token) {
    //   authService.setToken(token[0]);
    // }
  }

  private createAuthorizationHeader(headers: Headers) {
    // const authService = this.injector.get('penos');
    // if (authService.isLoggedIn()) {
    //   if (authService.getToken()) {
    //     const auth = authService.getToken();
    //     const token = 'JWT ' + auth;
    //     headers.append('Authorization', token);
    //   }
    // } else {
    //   authService.resetAuth();
    // }
  }

  private objToSearchParams(obj): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && obj[key].constructor === Array) {
          if (obj[key].length > 0) {
            for (const item of obj[key]) {
              if (item !== '') {
                params.append(key, item);
              }
            }
          }
        } else {
          if (obj[key] !== '') {
            params.set(key, obj[key]);
          }
        }
      }
    }
    return params;
  }

  private startLoader() {
    this.loadersCount += 1;
  }

  private completeLoader() {
    this.loadersCount -= 1;
    if (this.loadersCount <= 0) {
      this.loadersCount = 0;
    }
  }
}
