import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStatusSummaryWeightforheightComponent } from './nutritional-status-summary-weightforheight.component';

describe('NutritionalStatusSummaryWeightforheightComponent', () => {
  let component: NutritionalStatusSummaryWeightforheightComponent;
  let fixture: ComponentFixture<NutritionalStatusSummaryWeightforheightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalStatusSummaryWeightforheightComponent]
    });
    fixture = TestBed.createComponent(NutritionalStatusSummaryWeightforheightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
