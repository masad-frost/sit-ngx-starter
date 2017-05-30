import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from 'ng2-validation';
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sit-reset-password',  // <layout></layout>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./reset-password.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  public errors;
  public form: FormGroup;
  public success = false;
  public loading = false;

  // TypeScript public modifiers
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
    });
  }

  public onSubmit({value, valid}) {
    if (valid) {
      const {form: {value: formData}} = this;
      this.loading = true;
      this.authService.resetPassword(value).then(() => {
        this.loading = false;
        this.success = true;
      }).catch(this.handleError.bind(this));
      this.form.reset(formData, false);
    }
  }

  public handleError(error: any) {
    this.loading = false;
    this.errors = error.json();
  }
}
