import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  token: string;
  constructor(private http: Http) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users/')
      .map(res => res.json());
  }

  get(): Observable<any> {
    return this.http.get('/api/users/me')
      .map(res => res.json());
  }

  create(email: string, name: string, isOfferNotification: boolean, password: string): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/users',
      JSON.stringify({ email: email, isOfferNotification: isOfferNotification, name: name, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token: string = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
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

