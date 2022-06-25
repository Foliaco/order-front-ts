import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBussinesComponent } from './loading-bussines.component';

describe('LoadingBussinesComponent', () => {
  let component: LoadingBussinesComponent;
  let fixture: ComponentFixture<LoadingBussinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingBussinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
