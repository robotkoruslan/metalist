import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class CartService {
  data: any;
  constructor(private http: Http, private _cookieService: CookieService) {}

  getCart(): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.get('/api/carts/my-cart', options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
  }

  createCart(): Observable<boolean> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/carts', options)
      .map((response: Response) => {
        if (response.json().publicId) {
          this._cookieService.put('cart', response.json().publicId);
          return true;
        } else {
          return false;
        }
      });
  }

  loadCart() {
    return this.getCart();
  }

  getMyCart() {
    return this.data.cart;
  }

  // getMyCartSize() {
  //   return this.data.cart.size;
  // }
  //
  // getMyCartPrice() {
  //   if (this.data.cart.seats) {
  //     return this.data.cart.seats.reduce((price, seat) => {
  //       return price + seat.price;
  //     }, 0);
  //   }
  // }

  addSeatToCart(slug, matchId) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/carts/addSeat', {slug: slug, matchId: matchId}, options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
      // .then(response => this.data.cart = response.data);
  }

  removeSeatFromCart(slug, matchId) {
    return this.http.delete('/api/carts/match/' + matchId + '/seat/' + slug)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
      // .then(response => {
      //   this.data.cart = response.data;
      // });
  }

  getOrderByPrivateId(privateId) {
    return this.http.get('/api/orders/order/' + privateId);
  }

  checkout() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/orders/checkout', options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
      // .then(response => response.data);
  }

  pay() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post('/api/orders/pay-cashier', options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
      // .then(response => response.data);
  }

}
