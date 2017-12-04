import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class CartService {
  data: any;
  cart: any;
  constructor(private http: HttpClient, private _cookieService: CookieService) {}

  getCart(): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.get('/api/carts/my-cart', options)
      .map((response: Response) => {
        if (response) {
          this.cart = response;
          this.data = { 'cart' : this.cart};
          return true;
        } else {
          return false;
        }
      });
  }

  createCart(): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/carts', options)
      .map((response: Response) => {
        if (response.publicId) {
          this._cookieService.put('cart', response.publicId);
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
    if (this.data) {
      return this.data.cart;
    } else { return {}; }
  }

  getMyCartSize() {
    if (this.data) {
      return this.data.cart.size;
    } else {
      return 0; }

  }

  getMyCartPrice() {
    if (this.data.cart.seats) {
      return this.data.cart.seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    }
  }

  addSeatToCart(slug, matchId) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/carts/addSeat', {slug: slug, matchId: matchId}, options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
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
  }

  getOrderByPrivateId(privateId) {
    return this.http.get('/api/orders/order/' + privateId);
  }

  checkout() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/orders/checkout', options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
  }

  pay() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    return this.http.post('/api/orders/pay-cashier', options)
      .map((response: Response) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      });
  }

}
