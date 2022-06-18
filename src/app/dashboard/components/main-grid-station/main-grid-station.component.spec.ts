import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridStationComponent } from './main-grid-station.component';

describe('MainGridStationComponent', () => {
  let component: MainGridStationComponent;
  let fixture: ComponentFixture<MainGridStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainGridStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGridStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
