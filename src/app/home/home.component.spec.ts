import { HomeComponent } from './home.component';
import { async, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('Home component', () => {
  beforeEach(
    async(() => {
      this.component = null;
      TestBed.configureTestingModule({
        imports: [TranslateModule.forRoot()],
        providers: [TranslateService],
        declarations: [HomeComponent],
      });
      TestBed.overrideComponent(HomeComponent, {
        set: {
          template: `<div>No e2e</div>`,
        },
      });
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        this.component = fixture.componentInstance;
      });
    })
  );

  it('Changes value in constructor', () => {
    expect(this.component.test).toEqual(2);
  });

  it('Changes value on function call', () => {
    const expected = 15;
    this.component.testFunction(expected);
    expect(this.component.test).toEqual(expected);
  });
});
