import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  token: string;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('/api/users/')
      .map(res => res);
  }

  get(): Observable<any> {
    return this.http.get('/api/users/me')
      .map(res => res);
  }

  create(email: string, name: string, isOfferNotification: boolean, password: string): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/users',
      JSON.stringify({ email: email, isOfferNotification: isOfferNotification, name: name, password: password }), options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token: string = response && response.token;
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

