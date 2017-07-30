import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { camelizeKeys } from 'humps';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'sit-register',
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formErrors = {
    firstName: [],
    lastName: [],
    email: [],
    username: [],
    password: [],
    repeatPassword: [],
    nonFieldErrors: [],
  };
  // TODO translate these and add server messages
  private validationMessages = {
    firstName: {
      required: 'required',
      maxlength: 'maxlength',
    },
    lastName: {
      required: 'required',
      maxlength: 'maxlength',
    },
    username: {
      exists: 'exists',
      required: 'required',
    },
    email: {
      exists: 'exists',
      email: 'email',
      required: 'required',
    },
    password: {
      required: 'required',
    },
    repeatPassword: {
      equalTo: 'equalTo',
    },
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  public ngOnInit() {
    const password = new FormControl('', [Validators.required]);
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email]],
      password,
      repeatPassword: certainPassword,
    });

    this.form.valueChanges.subscribe(() => this.onValueChanged());
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService
      .register(
        this.form.get('firstName').value,
        this.form.get('lastName').value,
        this.form.get('username').value,
        this.form.get('email').value,
        this.form.get('password').value,
        this.form.get('repeatPassword').value
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

  // public nameChange(e) {
  //   if (e.key === ' ' && e.target.value[e.target.value.length - 1] === ' ') {
  //     return false;
  //   }
  //   if (this.form.get('username').pristine) {
  //     this.form
  //       .get('username')
  //       .setValue(
  //         this.form.get('first_name').value.trim().toLowerCase() +
  //           '_' +
  //           this.form.get('last_name').value.trim().toLowerCase()
  //       );
  //   }
  // }

  public handleError(error: any) {
    this.formErrors = error.json();
  }
}
