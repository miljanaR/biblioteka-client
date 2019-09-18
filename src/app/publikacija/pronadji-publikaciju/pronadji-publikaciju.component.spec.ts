import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronadjiPublikacijuComponent } from './pronadji-publikaciju.component';

describe('PronadjiPublikacijuComponent', () => {
  let component: PronadjiPublikacijuComponent;
  let fixture: ComponentFixture<PronadjiPublikacijuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronadjiPublikacijuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronadjiPublikacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
