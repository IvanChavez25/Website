import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BMIResultComponent } from './bmi-result.component';

describe('BMIResultComponent', () => {
  let component: BMIResultComponent;
  let fixture: ComponentFixture<BMIResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BMIResultComponent]
    });
    fixture = TestBed.createComponent(BMIResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
