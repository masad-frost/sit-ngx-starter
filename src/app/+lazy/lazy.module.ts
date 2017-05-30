import { HttpClient } from './../helpers/http.service';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sit-lazy-view',
  template: `<div (click)="register()">register</div>
  <div (click)="login()">login</div>
  <div (click)="logout()">logout</div>
  <div (click)="whoami()">whoami</div>`,
})
export class LazyViewComponent {
  constructor(private http: HttpClient) {
  }

  public register() {
    this.http.post('/register/', {
      first_name: 'Faris',
      last_name: 'Masad',
      username: 'masad-frost',
      email: 'farismasad@gmail.com',
      password: 'Yeahsureofcourse',
    }).then(
      (res) => console.log(res)
    );
  }

  public logout() {
    this.http.post('/logout/', {}).then(
      (res) => console.log(res)
    );
  }

  public login() {
    this.http.post('/login/', {
      username: 'masad-frost',
      password: 'Yeahsureofcourse',
    }).then(
      (res) => console.log(res)
    );
  }

  public whoami() {
    this.http.get('/whoami/').then(
      (res) => console.log(res)
    );
  }
}

@NgModule({
  declarations: [LazyViewComponent],
  imports: [
    RouterModule.forChild([
      {path: '', component: LazyViewComponent, pathMatch: 'full'},
    ]),
  ],
  providers: [HttpClient]
})
export class LazyModule {}
