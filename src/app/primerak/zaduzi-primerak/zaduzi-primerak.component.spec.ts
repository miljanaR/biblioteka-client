import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaduziPrimerakComponent } from './zaduzi-primerak.component';

describe('ZaduziPrimerakComponent', () => {
  let component: ZaduziPrimerakComponent;
  let fixture: ComponentFixture<ZaduziPrimerakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaduziPrimerakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaduziPrimerakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
