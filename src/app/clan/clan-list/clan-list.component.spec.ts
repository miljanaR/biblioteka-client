import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanListComponent } from './clan-list.component';

describe('ClanListComponent', () => {
  let component: ClanListComponent;
  let fixture: ComponentFixture<ClanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
