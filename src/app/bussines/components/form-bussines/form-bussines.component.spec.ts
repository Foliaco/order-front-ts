import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBussinesComponent } from './form-bussines.component';

describe('FormBussinesComponent', () => {
  let component: FormBussinesComponent;
  let fixture: ComponentFixture<FormBussinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBussinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
