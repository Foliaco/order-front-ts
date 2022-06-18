import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMenuDocsComponent } from './bar-menu-docs.component';

describe('BarMenuDocsComponent', () => {
  let component: BarMenuDocsComponent;
  let fixture: ComponentFixture<BarMenuDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarMenuDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarMenuDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
