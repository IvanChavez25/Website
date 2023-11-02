import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStatusSummaryHeightforageComponent } from './nutritional-status-summary-heightforage.component';

describe('NutritionalStatusSummaryHeightforageComponent', () => {
  let component: NutritionalStatusSummaryHeightforageComponent;
  let fixture: ComponentFixture<NutritionalStatusSummaryHeightforageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalStatusSummaryHeightforageComponent]
    });
    fixture = TestBed.createComponent(NutritionalStatusSummaryHeightforageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
