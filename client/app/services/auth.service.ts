import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class AuthService {
  user: any = {};
  public token: string;
  constructor(private http: Http, private _cookieService: CookieService) { }

  login(email: string, password: string): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/auth/local', JSON.stringify({ email: email, password: password }), options)
      .map((response: Response) => {
        const token: string = response.json() && response.json().token;
        if (token) {
          this.token = token;
          this._cookieService.put('token', token);
          this.getUser();
          return true;
        } else {
          return false;
        }
      });
  }


  // getUser() {
  //   const promise = new Promise((resolve, reject) => {
  //     this.http.get('/api/users/me')
  //       .toPromise()
  //       .then(
  //         response => { // Success
  //           console.log('----getUser then');
  //           this.user = response.json();
  //           resolve();
  //         }
  //       );
  //   });
  //   return promise;
  // }

  logout(): void {
    this.token = null;
    this._cookieService.remove('token');
  }

  getUser() {
    return this.http.get('/api/users/me')
      .map((response: Response) => {
        if (response) {
          this.user = response.json();
          return true;
        } else {
          return false;
        }
      })
      .subscribe( () => { });
  }

  getCurrentUser() {
    // console.log('getCurrentUser   ', this.user);
    return this.user;

  }

  hasRole() {
    return this.getCurrentUser().role;
  }

  isAdmin() {
    return this.hasRole() === 'admin';
  }


  isModerator() {
    return this.hasRole() === 'moderator';
  }


  isCashier() {
    return this.hasRole() === 'cashier';
  }

  // isLoggedIn() {
  //   console.log(' --- isLoggedIn');
  //   return this.isAuthenticated();
  //     // .then(() => true);
  // }

  isLoggedIn() {
    if (!this.user.name) {
      const token = this._cookieService.get('token');
      if (token) {
        return this.getUser();
      }else {
        return false;
      }
    } else {
      return true;
    }
  }

}


// import { Injectable } from '@angular/core';
//
// @Injectable()
// export class MessageService {
//   messages: string[] = [];
//
//   add(message: string) {
//     console.log('MessageService add');
//     this.messages.push(message);
//   }
//
//   clear() {
//     this.messages.length = 0;
//   }
// }
