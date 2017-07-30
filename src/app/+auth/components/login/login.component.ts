import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { camelizeKeys } from 'humps';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sit-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formErrors = {
    username: [],
    password: [],
    nonFieldErrors: [],
  };
  // TODO translate these and add server messages
  private validationMessages = {
    username: {
      required: 'Username is required.',
    },
    password: {
      required: 'Password is required.',
    },
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    this.form.valueChanges.subscribe(() => this.onValueChanged());
  }

  public onValueChanged(): void {
    const form = this.form;

    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      this.formErrors[field] = [];
      const control = form.get(field);

      if (control && control.touched && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService
      .login(
        this.form.get('username').value,
        this.form.get('password').value,
        this.form.get('rememberMe').value
      )
      .catch(error => {
        if (!error.json) {
          return Promise.reject(error.message || error);
        }

        const serverErrors = camelizeKeys(error.json());
        for (const field of Object.keys(serverErrors)) {
          this.formErrors[field] = (this.formErrors[field] || []).concat(serverErrors[field]);
        }
      });
  }
}
