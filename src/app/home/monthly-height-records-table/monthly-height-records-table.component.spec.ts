import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyHeightRecordsTableComponent } from './monthly-height-records-table.component';

describe('MonthlyHeightRecordsTableComponent', () => {
  let component: MonthlyHeightRecordsTableComponent;
  let fixture: ComponentFixture<MonthlyHeightRecordsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyHeightRecordsTableComponent]
    });
    fixture = TestBed.createComponent(MonthlyHeightRecordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
