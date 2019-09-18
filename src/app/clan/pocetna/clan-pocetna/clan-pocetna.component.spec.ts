import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanPocetnaComponent } from './clan-pocetna.component';

describe('ClanPocetnaComponent', () => {
  let component: ClanPocetnaComponent;
  let fixture: ComponentFixture<ClanPocetnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanPocetnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
