import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyWeightComponent } from './monthly-weight.component';

describe('MonthlyWeightComponent', () => {
  let component: MonthlyWeightComponent;
  let fixture: ComponentFixture<MonthlyWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyWeightComponent]
    });
    fixture = TestBed.createComponent(MonthlyWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
