import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackDashboard } from './stack-dashboard';

describe('StackDashboard', () => {
  let component: StackDashboard;
  let fixture: ComponentFixture<StackDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(StackDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
