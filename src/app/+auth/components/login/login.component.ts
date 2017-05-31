import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sit-login',  // <layout></layout>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./login.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public errors;
  public form: FormGroup;
  // TypeScript public modifiers
  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              private authService: AuthService, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  public onSubmit({value, valid}) {
    if (valid) {
      this.authService.login(
        this.form.value.username,
        this.form.value.password
      )
        .catch(this.handleError.bind(this));
    }
  }

  private handleError(error: any) {
    if (error.json) {
      this.errors = error.json();
    }

    return Promise.reject(error.message || error);
  }
}
