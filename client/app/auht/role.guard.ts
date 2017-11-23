import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate, CanActivateChild{
  constructor(public auth: AuthService, public router: Router, private _cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = route.data.expectedRole;
    const token = this._cookieService.get('token');
    console.log('RoleGuard ', token);
    if (!token) {
      console.log('RoleGuard ');
      this.router.navigate(['login']);
    } else {
      this.auth.isLoggedIn();
    }

    const tokenPayload = decode(token);
    if (
      // !this.auth.isAuthenticated() ||
    tokenPayload.role !== expectedRole
    ) {
      console.log('RoleGuard login');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = route.data.expectedRole;
    const token = this._cookieService.get('token');
    console.log('RoleGuard ', token);
    const tokenPayload = decode(token);
    if (
      !this.auth.isLoggedIn() ||
    tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
