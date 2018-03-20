import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'confirm-email-form',
  templateUrl: './confirm-email-form.html',
  styleUrls: ['./confirm-email-form.less']
})

export class ConfirmEmailFormComponent {
  loginMessage: string;
  confirmationMessage: string;
  showSection = false;
  emailValue: string;


  constructor(private authenticationService: AuthService) {}

  handleSubmit(data) {

    if (this.emailValue) {
      this.login(data);
    } else {
      this.confirmEmail(data);
    }
  }
  login({email, password}) {
    if (!email || !password) {
      return;
    }
    this.confirmationMessage = '';
    this.authenticationService.login(email, password)
      .subscribe(result => {
          if (!result) {
            this.loginMessage = 'fail';
          }
        }, ({error: {message}}) => this.loginMessage = message
      );
  }

  confirmEmail({email}) {
    if (!email) {
      return;
    }
    this.authenticationService.generateTemporaryPassword(email)
      .subscribe(
        response => {
          this.showSection = true;
          this.confirmationMessage = response.message;
          this.emailValue = email;
        },
        ({error, status}) => {
          this.confirmationMessage = error && error.message;
          if (status === 409) {
            this.confirmationMessage = 'alreadyTaken';
          }
        }
      );
  }

  handleEmailInput = () => this.confirmationMessage = null;
  handlePasswordInput = () => this.loginMessage = null;
}
