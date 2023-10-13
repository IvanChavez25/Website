import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRecordComponent } from './monthly-record.component';

describe('MonthlyRecordComponent', () => {
  let component: MonthlyRecordComponent;
  let fixture: ComponentFixture<MonthlyRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyRecordComponent]
    });
    fixture = TestBed.createComponent(MonthlyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
