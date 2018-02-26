import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'confirm-email-form',
  templateUrl: './confirm-email-form.html',
  styleUrls: ['./confirm-email-form.css']
})

export class ConfirmEmailFormComponent {
  loginMessage: string;
  confirmationMessage: string;
  showSection = false;

  constructor(private authenticationService: AuthService) {}

  login(email, password) {
    this.authenticationService.login(email, password)
      .subscribe(result => {
          if (!result) {
            this.loginMessage = 'fail';
          }
        }, ({error: {message}}) => this.loginMessage = message
      );
  }

  confirmEmail(email) {
    this.authenticationService.generateTemporaryPassword(email)
      .subscribe(
        response => {
          this.showSection = true;
          this.confirmationMessage = response.message;
        },
        err => {
          this.confirmationMessage = err.message;
          if (err.status === 409) {
            this.confirmationMessage = 'alreadyTaken';
          }
        }
      );
  }

  handleEmailInput = () => this.confirmationMessage = null;
  handlePasswordInput = () => this.loginMessage = null;
}
