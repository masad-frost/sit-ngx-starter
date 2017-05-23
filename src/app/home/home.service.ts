import { Injectable } from '@angular/core';
import { HttpClient } from '../helpers/http.service';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) {
    //
  }
}
