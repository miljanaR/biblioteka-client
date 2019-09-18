import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KreirajClanaComponent } from './kreiraj-clana.component';

describe('KreirajClanaComponent', () => {
  let component: KreirajClanaComponent;
  let fixture: ComponentFixture<KreirajClanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KreirajClanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KreirajClanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
