import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencieComponent } from './dependencie.component';

describe('DependencieComponent', () => {
  let component: DependencieComponent;
  let fixture: ComponentFixture<DependencieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependencieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
