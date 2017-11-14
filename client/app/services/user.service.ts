import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users/')
      .map(res => res.json());
  }

  get(): Observable<any> {
    return this.http.get('/api/users/me')
      .map(res => res.json());
  }

  // changePassword(): Observable<any> {
  //   return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
  //     .map(res => res.json());
  // }
  //
  // generateGuestPassword(): Observable<any> {
  //   return this.http.get('/api/tickets/statistics', {params: {date: data.date, metod: data.metod}})
  //     .map(res => res.json());
  // }
}

