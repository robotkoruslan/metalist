import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

import {AuthService} from '../services/auth.service';
import {User} from '../model/user.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: Boolean = false;
  currentUser: User;
  isLoggedIn: Boolean;
  subscription: Subscription;

  constructor(private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authenticationService.user
      .subscribe(value => {
          this.currentUser = value;
          this.isLoggedIn = Boolean(value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  toggleState = () => this.isCollapsed = !this.isCollapsed;

  isAdmin = () => this.authenticationService.isAdmin();

  isCashier = () => this.authenticationService.isCashier();
  get loggedInWithOauth () {
    return this.currentUser && this.currentUser.provider !== 'local';
  }

  get width () {
    let width = 250;
    if (this.isCashier()) {
      width = 190;
    }
    if (this.isAdmin()) {
      width = 120;
    }
    return width;
  }
}
