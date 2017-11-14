import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService {



   cart: any;

  constructor(private http: Http, private cookies: CookieService) {}

  loadCart() {
    return this.getCart();
  }

  getMyCart() {
    return this.cart;
  }

  // getMyCartSize() {
  //   return this.data.cart.size;
  // }

  getMyCartPrice() {
    if (this.cart.seats) {
      return this.cart.seats.reduce((price, seat) => {
        return price + seat.price;
      }, 0);
    }
  }

  // createCart() {
  //   return this.http.post('/api/carts')
  //     .map(res => res.json())
  //     .subscribe(cart => this.data.cart = cart);
  //
  //     // .then(response => {
  //     //   this.data.cart = response.data;
  //     //   this.cookies.put('cart', response.data.publicId);
  //     //
  //     //   return this.data.cart;
  //     // });
  // }

  getCart() {

    console.log('this.cookies.put', this.cookies.put());

    return this.http.get('/api/carts/my-cart')
      .map(res => res.json())
      .subscribe(cart => this.cart = cart);
  }

  addSeatToCart(slug, matchId) {
    return this.http.post('/api/carts/addSeat', {slug: slug, matchId: matchId})
      .map(res => res.json())
      .subscribe(cart => this.cart = cart);
  }

  removeSeatFromCart(slug, matchId) {
    return this.http.delete('/api/carts/match/' + matchId + '/seat/' + slug)
      .map(res => res.json())
      .subscribe(cart => this.cart = cart);
  }

  getOrderByPrivateId(privateId) {
    console.log('getOrderByPrivateId');
    return this.http.get('/api/orders/order/' + privateId)
      .map(res => res.json())
      .subscribe(cart => cart);
  }

  // checkout() {
  //   return this.http.post('/api/orders/checkout')
  //     .map(res => res.json());
  // }
  //
  // pay() {
  //   return this.http.post('/api/orders/pay-cashier')
  //     .map(res => res.json());
  // }

}
