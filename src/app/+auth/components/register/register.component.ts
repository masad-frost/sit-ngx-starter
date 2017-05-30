import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { CustomValidators } from 'ng2-validation';
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'sit-register',  // <layout></layout>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./register.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public errors;
  public success;
  public submitted = false;
  public registrationForm;
  private newUser;
  // TypeScript public modifiers
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.newUser = new User();
    const password = new FormControl('', [Validators.required]);
    const certainPassword = new FormControl('', CustomValidators.equalTo(password));
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password,
      retype_password: certainPassword,
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', Validators.required],
    });
  }

  public ngOnInit() {
    this.registrationForm.get('email').valueChanges.subscribe((value) => {
      if (this.errors && this.errors.email) {
        this.errors.email = null;
      }
    });
  }

  public onSubmit({value, valid}) {
    this.newUser = value;
    if (valid) {
      const {registrationForm: {value: formValueSnap}} = this;
      this.authService.register(value).then((data) => {
        this.success = true;
      }).catch(this.handleError.bind(this));
      this.submitted = false;
      this.registrationForm.reset(formValueSnap, false);
    } else {
      this.submitted = true;
    }
  }

  public nameChange(e) {
    if (e.key === ' ' && e.target.value[e.target.value.length - 1] === ' ') {
      return false;
    }
    if (this.registrationForm.get('username').pristine) {
      this.registrationForm.get('username').setValue(
        this.registrationForm.get('first_name').value.trim() +
        '_' + this.registrationForm.get('last_name').value.trim()
      );
    }
  }

  public handleError(error: any) {
    this.errors = error.json();
  }
}
