import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'shared-form',
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.less']
})
export class SharedFormComponent implements OnInit{
  form: FormGroup;
  fields: string[] = [];
  @Input() type: string;
  constructor() {}
  ngOnInit() {
    this.getFields();
    this.form = this.generateForm();
  }

  generateForm = () => {
    const controlsConfig = {};
    console.log(20, this.fields);

    this.fields.forEach(field => controlsConfig[field] = this.getFormControl(field));
    return new FormGroup(controlsConfig);
  }
  getFields = () => {
    console.log(26, this.type);
    switch (this.type) {
      case 'login':
        this.fields = ['email', 'password'];
        break;
      case 'register':
        this.fields = ['name', 'email', 'password', 'confirmPassword', 'subscribeNews'];
        break;
      case 'recovery':
        this.fields = ['email'];
        break;
      case 'settings':
        this.fields = ['currentPasswords', 'newPassword', 'confirmPassword'];
        break;
    }
  }
  getFormControl(field) {
    switch (field) {
      case 'email':
        return this.requiredEmailField;
      case 'subscribeNews':
        return this.field;
      default:
        return this.requiredField;
    }
  }

  private get requiredField () {
    return new FormControl('', [Validators.required]);
  }
  private get requiredEmailField () {
    return new FormControl('', [Validators.required, Validators.email]);
  }
  private get field () {
    return new FormControl('');
  }
  getInputType = (field) => {
    switch (field) {
      case 'name':
        return 'text';
      case 'email':
        return 'email';
      case 'subscribeNews':
        return 'checkbox';
      default:
        return 'password';
    }
  }
}

