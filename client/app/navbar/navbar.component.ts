import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isLoggedIn: Boolean;
  // isAdmin: Boolean;
  // isCashier: Boolean;
  isCollapsed: Boolean;
  currentUser: any = {};

  constructor(private authenticationService: AuthService) {
    'ngInject';
    // this.isLoggedIn = this.authenticationService.isAdmin();
    // this.isAdmin = this.authenticationService.isAdmin();
    // this.isCashier = this.authenticationService.isCashier();
    // this.getCurrentUser = this.authenticationService.getCurrentUser();
    // this.getCurrentUser.name = 'User';
    this.isCollapsed = true;
  }

  isLoggedIn(){
    this.getCurrentUser();
    return this.authenticationService.isLoggedIn();
  }

  isAdmin(){
    // console.log('isLoggedIn', this.authenticationService.isAdmin());
    return this.authenticationService.isAdmin();
  }

  // isAuthenticated(){
  //   // console.log(' NavbarComponent isAuthenticated', this.authenticationService.isAuthenticated());
  //   return this.authenticationService.isAuthenticated();
  // }

  getCurrentUser(){
    // console.log('isLoggedIn', this.authenticationService.isAdmin());
    return this.currentUser = this.authenticationService.getCurrentUser();
  }

  ngOnInit() {
  }

}
