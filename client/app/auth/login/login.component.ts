import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

import {User} from '../../model/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  error:string;

  form = new FormGroup({
    login: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    })
  });

  constructor(private router:Router, private authenticationService:AuthService) {
  }

  login() {
    const {email, password} = this.form.value.login;
    this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
        }
      }, ({error: {message}}) => {
        console.log('Something went wrong!', message);
        this.error = message;
      });
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

}