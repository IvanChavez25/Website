import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyRecordsComponent } from './quarterly-records.component';

describe('QuarterlyRecordsComponent', () => {
  let component: QuarterlyRecordsComponent;
  let fixture: ComponentFixture<QuarterlyRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyRecordsComponent]
    });
    fixture = TestBed.createComponent(QuarterlyRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
