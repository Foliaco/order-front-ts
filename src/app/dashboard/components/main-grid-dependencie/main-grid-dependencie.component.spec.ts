import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridDependencieComponent } from './main-grid-dependencie.component';

describe('MainGridDependencieComponent', () => {
  let component: MainGridDependencieComponent;
  let fixture: ComponentFixture<MainGridDependencieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGridDependencieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGridDependencieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
