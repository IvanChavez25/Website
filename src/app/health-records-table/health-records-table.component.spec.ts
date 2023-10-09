import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordsTableComponent } from './health-records-table.component';

describe('HealthRecordsTableComponent', () => {
  let component: HealthRecordsTableComponent;
  let fixture: ComponentFixture<HealthRecordsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthRecordsTableComponent]
    });
    fixture = TestBed.createComponent(HealthRecordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
