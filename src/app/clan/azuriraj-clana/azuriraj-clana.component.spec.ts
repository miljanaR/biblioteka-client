import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajClanaComponent } from './azuriraj-clana.component';

describe('AzurirajClanaComponent', () => {
  let component: AzurirajClanaComponent;
  let fixture: ComponentFixture<AzurirajClanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzurirajClanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajClanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
