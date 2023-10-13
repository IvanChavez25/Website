import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRecordsInfantComponent } from './monthly-records-infant.component';

describe('MonthlyRecordsInfantComponent', () => {
  let component: MonthlyRecordsInfantComponent;
  let fixture: ComponentFixture<MonthlyRecordsInfantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyRecordsInfantComponent]
    });
    fixture = TestBed.createComponent(MonthlyRecordsInfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
