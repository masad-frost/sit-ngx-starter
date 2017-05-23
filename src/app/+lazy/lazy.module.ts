import {NgModule, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'lazy-view',
  template: `<h3>lazy viewewwww</h3>`,
})
export class LazyViewComponent {
  constructor() {
  }
}

@NgModule({
  declarations: [LazyViewComponent],
  imports: [
    RouterModule.forChild([
      {path: '', component: LazyViewComponent, pathMatch: 'full'},
    ]),
  ],
})
export class LazyModule {}
