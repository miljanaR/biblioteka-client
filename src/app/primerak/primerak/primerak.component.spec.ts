import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerakComponent } from './primerak.component';

describe('PrimerakComponent', () => {
  let component: PrimerakComponent;
  let fixture: ComponentFixture<PrimerakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimerakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
