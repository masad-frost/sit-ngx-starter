import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { DOCUMENT } from '@angular/platform-browser';

interface ICookieOptions {
  path?: string;
  domain?: string;
  expireDays?: number;
  secure?: boolean;
}

@Injectable()
export class CookieService {
  constructor(
    @Inject(DOCUMENT) document: any,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(REQUEST) private request,
    @Inject(RESPONSE) private response
  ) {}

  public getCookie(name: string): string {
    if (isPlatformBrowser(this.platformId)) {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
          return decodeURIComponent(value);
        }
      }
    } else {
      const cookie = this.request.cookies[name];
      if (cookie) {
        return cookie;
      }
    }
    return '';
  }

  public setCookie(name: string, value: string, options?: ICookieOptions) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + options.expireDays);

    if (isPlatformBrowser(this.platformId)) {
      let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      cookieStr += options && options.path ? `;path=${options.path}` : '';
      cookieStr += options && options.domain ? `;domain=${options.domain}` : '';
      cookieStr += options && options.expireDays ? `;expires=${expireDate.toUTCString()}` : '';
      // We should probably disable this in dev
      cookieStr += options && options.secure ? ';secure' : '';
      document.cookie = cookieStr;
    } else {
      this.response.cookie(name, value, {
        ...options,
        expires: options && options.expireDays ? new Date(expireDate) : 0,
      });
    }
  }

  public getCookieString() {
    if (isPlatformBrowser(this.platformId)) {
      return document.cookie;
    } else {
      return Object.keys(this.request.cookie).reduce(
        cookieName => cookieName + this.request.cookie[cookieName] + ';'
      );
    }
  }

  public deleteCookie(name: string, options?: ICookieOptions) {
    // Make sure the options match the targeted cookie
    this.setCookie(name, '', { ...options, expireDays: -1 });
  }
}
