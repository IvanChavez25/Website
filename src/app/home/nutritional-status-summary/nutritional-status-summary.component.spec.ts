import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStatusSummaryComponent } from './nutritional-status-summary.component';

describe('NutritionalStatusSummaryComponent', () => {
  let component: NutritionalStatusSummaryComponent;
  let fixture: ComponentFixture<NutritionalStatusSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalStatusSummaryComponent]
    });
    fixture = TestBed.createComponent(NutritionalStatusSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
