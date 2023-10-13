import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyWeightRecordsTableComponent } from './monthly-weight-records-table.component';

describe('MonthlyWeightRecordsTableComponent', () => {
  let component: MonthlyWeightRecordsTableComponent;
  let fixture: ComponentFixture<MonthlyWeightRecordsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyWeightRecordsTableComponent]
    });
    fixture = TestBed.createComponent(MonthlyWeightRecordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
