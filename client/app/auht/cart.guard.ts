import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(public auth: AuthService, public cartService: CartService, public router: Router, private _cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // const expectedRole = route.data.expectedRole;
    const cart = this._cookieService.get('cart');
    // console.log('CartGuard ', cart);
    if (!cart) {
      // console.log('CartGuard ');
      // this.auth.isLoggedIn();
      return this.cartService.createCart();
    } else {
      return this.cartService.getCart();
    }
    // return true;
  }
}
