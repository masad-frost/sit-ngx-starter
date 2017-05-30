import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from 'ng2-validation';
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sit-reset-password',  // <layout></layout>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./reset-password-confirm.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './reset-password-confirm.component.html'
})
export class ResetPasswordConfirmComponent implements OnInit {
  public errors;
  public form: FormGroup;
  public uid;
  public token;
  // TypeScript public modifiers
  constructor(fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    const password = new FormControl('', Validators.required);
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));
    this.form = fb.group({
      new_password1: password,
      new_password2: certainPassword,
    });
  }

  public onSubmit({value, valid}) {
    if (valid) {
      const {form: {value: formData}} = this;
      this.authService.confirmResetPassword(value, this.uid, this.token).then((data) => {
      }).catch(this.handleError.bind(this));
      this.form.reset(formData, false);
    }
  }

  public handleError(error: any) {
    this.errors = error.json();
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      this.uid = params['uid']; // (+) converts string 'id' to a number
      this.token = params['token']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }
}
