import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDashboard } from './flights-dashboard';

describe('FlightsDashboard', () => {
  let component: FlightsDashboard;
  let fixture: ComponentFixture<FlightsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
