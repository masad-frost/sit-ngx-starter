import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth.routes';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './components/reset-password-confirm/reset-password-confirm.component';

/*
 * Platform and Environment providers/directives/pipes
 */

@NgModule({
  exports: [LoginComponent, RegisterComponent],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,
  ],
  imports: [ // import Angular's modules
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
  providers: [
    UserService,
    AuthService,
  ],
})
export class LoginModule {
}
