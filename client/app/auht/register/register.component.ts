import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.interface';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    if(!password.value || !confirmPassword.value) {
      return;
    }
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;

  user: User;
  error: string;
  registrationForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) {

    this.registrationForm = formBuilder.group({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      subscribeNews: new FormControl('')
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
  }
  
  register() {
    this.loading = true;
    const { name, email, password, subscribeNews } = this.registrationForm.value;
    this.userService.create(email, name, subscribeNews, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/login']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, ({error: {message}}) => {
        console.log('Something went wrong!', message);
        this.error = message;
      });
  }

}
