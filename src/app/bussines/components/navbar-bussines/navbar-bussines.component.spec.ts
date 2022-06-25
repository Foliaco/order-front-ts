import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBussinesComponent } from './navbar-bussines.component';

describe('NavbarBussinesComponent', () => {
  let component: NavbarBussinesComponent;
  let fixture: ComponentFixture<NavbarBussinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBussinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
