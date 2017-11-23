import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {AuthService} from '../../services/auth.service';

// import { User } from '../../model/user.interface';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  loading = false;
  error = '';
  // user: User = {name: '', email: '', password: ''};


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private authenticationService: AuthService, private _cookieService: CookieService) { }

  // cookie(){
  //     this._cookieService.put('token', '12334557657878');
  //     console.log('cook', this._cookieService.get('token'));
  //   }


  login() {
    console.log(this.user);
    this.loading = true;
    this.authenticationService.login(this.user.email, this.user.password)
      .subscribe(result => {
        // console.log('login result ', result);
        this.router.navigate(['/']);
        // if (result === true) {
        //   console.log('login result0 ');
        //   // login successful
        //   this.router.navigate(['/']);
        // } else {
        //   // login failed
        //   this.error = 'Username or password is incorrect';
        //   this.loading = false;
        // }
      });
  }

   ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

}
