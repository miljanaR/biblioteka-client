import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazduziPrimerakComponent } from './razduzi-primerak.component';

describe('RazduziPrimerakComponent', () => {
  let component: RazduziPrimerakComponent;
  let fixture: ComponentFixture<RazduziPrimerakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazduziPrimerakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazduziPrimerakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
