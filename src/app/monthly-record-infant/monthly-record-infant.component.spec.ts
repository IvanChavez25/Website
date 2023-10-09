import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRecordInfantComponent } from './monthly-record-infant.component';

describe('MonthlyRecordInfantComponent', () => {
  let component: MonthlyRecordInfantComponent;
  let fixture: ComponentFixture<MonthlyRecordInfantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyRecordInfantComponent]
    });
    fixture = TestBed.createComponent(MonthlyRecordInfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
