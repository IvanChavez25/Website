import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthRecordsComponent } from './health-records.component';

describe('HealthRecordsComponent', () => {
  let component: HealthRecordsComponent;
  let fixture: ComponentFixture<HealthRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthRecordsComponent]
    });
    fixture = TestBed.createComponent(HealthRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
