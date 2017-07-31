import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'sit-reset-password',
  styleUrls: ['./reset-password.component.css'],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  public errors;
  public form: FormGroup;
  public success = false;
  public loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
    });
  }

  public onSubmit({ value, valid }) {
    if (valid) {
      const { form: { value: formData } } = this;
      this.loading = true;
      this.authService
        .resetPassword(value)
        .then(() => {
          this.loading = false;
          this.success = true;
        })
        .catch(this.handleError.bind(this));
      this.form.reset(formData, { emitEvent: false, onlySelf: false });
    }
  }

  public handleError(error: any) {
    this.loading = false;
    this.errors = error.json();
  }
}
