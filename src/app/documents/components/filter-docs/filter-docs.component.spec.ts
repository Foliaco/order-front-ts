import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDocsComponent } from './filter-docs.component';

describe('FilterDocsComponent', () => {
  let component: FilterDocsComponent;
  let fixture: ComponentFixture<FilterDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
