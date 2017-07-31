import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { decamelizeKeys, camelizeKeys } from 'humps';
import { CookieService } from './cookie.service';
import { objToSearchParams } from './utils';

export const API_URL = process.env.API_URL;

@Injectable()
export class HttpClient {
  private loadersCount = 0;

  constructor(public http: Http, public cookieService: CookieService) {}

  public get(url, data = {}) {
    url = API_URL + url;
    data = decamelizeKeys(data);
    const headers = this.getHeaders();
    const params = objToSearchParams(data);
    const options = new RequestOptions({ headers, search: params });
    return this.http
      .get(url, options)
      .toPromise()
      .then(result => result.json())
      .then(camelizeKeys);
  }

  public post(url, data = {}) {
    url = API_URL + url;
    data = decamelizeKeys(data);
    const headers = this.getHeaders();
    const options = new RequestOptions({ headers });
    return this.http
      .post(url, data, options)
      .toPromise()
      .then(result => result.json())
      .then(camelizeKeys);
  }

  public delete(url, data = {}) {
    url = API_URL + url;
    data = decamelizeKeys(data);
    const headers = this.getHeaders();
    const options = new RequestOptions({ headers });
    return this.http
      .delete(url, options)
      .toPromise()
      .then(result => result.json())
      .then(camelizeKeys);
  }

  public patch(url, data = {}) {
    url = API_URL + url;
    data = decamelizeKeys(data);
    const headers = this.getHeaders();
    const options = new RequestOptions({ headers });
    return this.http
      .patch(url, data, options)
      .toPromise()
      .then(result => result.json())
      .then(camelizeKeys);
  }

  public put(url, data = {}) {
    url = API_URL + url;
    data = decamelizeKeys(data);
    const headers = this.getHeaders();
    const options = new RequestOptions({ headers });
    return this.http
      .put(url, data, options)
      .toPromise()
      .then(result => result.json())
      .then(camelizeKeys);
  }

  private getHeaders(): Headers {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const csrfToken = this.cookieService.getCookie('csrftoken');
    if (csrfToken) {
      headers.append('X-CSRFToken', csrfToken);
    }
    return headers;
  }
}
