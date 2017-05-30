import 'rxjs/add/operator/toPromise';
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
    const headers = this.getHeaders();
    const params = this.objToSearchParams(data);
    const options = new RequestOptions({headers, search: params});
    return this.http.get(url, options).toPromise()
      .then((result) => result.json())
      .catch(this.handleError.bind(this));
  }

  public post(url, data = {}) {
    url = API_URL + url;
    const headers = this.getHeaders();
    const options = new RequestOptions({headers});
    return this.http.post(url, data, options).toPromise()
      .then((result) => result.json())
      .catch(this.handleError.bind(this));
  }

  public delete(url, data = {}) {
    url = API_URL + url;
    const headers = this.getHeaders();
    const options = new RequestOptions({headers});
    return this.http.delete(url, options).toPromise()
      .then((result) => result.json())
      .catch(this.handleError.bind(this));
  }

  public patch(url, data = {}) {
    url = API_URL + url;
    const headers = this.getHeaders();
    const options = new RequestOptions({headers});
    return this.http.patch(url, data, options).toPromise()
      .then((result) => result.json())
      .catch(this.handleError.bind(this));
  }

  public put(url, data = {}) {
    url = API_URL + url;
    const headers = this.getHeaders();
    const options = new RequestOptions({headers});
    return this.http.put(url, data, options).toPromise()
      .then((result) => result.json())
      .catch(this.handleError.bind(this));
  }

  private handleError(error) {}

  private getHeaders(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});
    const csrfToken = this.getCookie('csrftoken');
    if (csrfToken) {
      headers.append('X-CSRFToken', csrfToken);
    }
    return headers;
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

  private getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return '';
  }
}
