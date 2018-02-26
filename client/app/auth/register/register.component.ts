import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;

  user:User;
  error:string;
  registrationForm:FormGroup;

  constructor(private router:Router,
              private userService:UserService,
              private formBuilder:FormBuilder) {

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
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    const {name, email, password, subscribeNews} = this.registrationForm.value;
    this.userService.create(email, name, subscribeNews, password)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/login']);
        } else {
          this.error = 'fail';
          this.loading = false;
        }
      }, ({error: {message}}) => {
        console.log('Something went wrong!', message);
        this.error = message;
      });
  }

  private matchingPasswords(passwordKey:string, confirmPasswordKey:string) {
    return (group:FormGroup):{[key:string]:any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (!password.value || !confirmPassword.value) {
        return;
      }
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}
