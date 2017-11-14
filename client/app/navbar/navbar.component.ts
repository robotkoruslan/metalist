import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Boolean;
  isAdmin: Boolean;
  isCashier: Boolean;
  isCollapsed: Boolean;
  getCurrentUser: any;

  constructor() {
    'ngInject';
    this.isLoggedIn = true;
    this.isAdmin = true;
    this.isCashier = true;
    this.getCurrentUser = {};
    this.getCurrentUser.name = 'User';
    this.isCollapsed = true;
  }

  ngOnInit() {
  }

}
