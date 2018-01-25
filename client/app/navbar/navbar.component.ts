import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import {AuthService} from '../services/auth.service';
import {User} from "../model/user.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: Boolean;
  currentUser: User;

  constructor(private authenticationService: AuthService) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.authenticationService.user
      .subscribe(value => {
        if(!value) {
          this.authenticationService.getUser()
            .subscribe();
        }
        this.currentUser = value;
      });
  }

  isLoggedIn = () => this.authenticationService.isLoggedIn();

  isAdmin = () => this.authenticationService.isAdmin();

  isCashier = () => this.authenticationService.isCashier();

}
