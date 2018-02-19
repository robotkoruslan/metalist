import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import {AuthService} from '../services/auth.service';
import {User} from '../model/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: Boolean = false;
  currentUser: User;
  isLoggedIn: Boolean;

  constructor(private authenticationService: AuthService) {
  }

  ngOnInit() {
    this.authenticationService.user
      .subscribe(value => {
        if (value) {
          this.isLoggedIn = true;
          this.currentUser = value;
        } else {
          this.authenticationService.getUser()
            .subscribe(
              res => {
                this.isLoggedIn = true;
                this.currentUser = res;
              },
              err => {
                this.isLoggedIn = false;
                this.currentUser = null;
              }
            );
        }
      });
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
