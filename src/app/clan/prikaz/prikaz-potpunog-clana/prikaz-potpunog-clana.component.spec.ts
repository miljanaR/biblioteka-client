import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazPotpunogClanaComponent } from './prikaz-potpunog-clana.component';

describe('PrikazPotpunogClanaComponent', () => {
  let component: PrikazPotpunogClanaComponent;
  let fixture: ComponentFixture<PrikazPotpunogClanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrikazPotpunogClanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrikazPotpunogClanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
