import { HttpClient } from './../helpers/http.service';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sit-lazy-view',
  template: `<h1>asdas</h1>`,
})
export class LazyViewComponent {
}

@NgModule({
  declarations: [LazyViewComponent],
  imports: [
    RouterModule.forChild([
      {path: '', component: LazyViewComponent, pathMatch: 'full'},
    ]),
  ],
  providers: [HttpClient],
})
export class LazyModule {}
