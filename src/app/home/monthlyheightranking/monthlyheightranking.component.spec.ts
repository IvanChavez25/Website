import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyheightrankingComponent } from './monthlyheightranking.component';

describe('MonthlyheightrankingComponent', () => {
  let component: MonthlyheightrankingComponent;
  let fixture: ComponentFixture<MonthlyheightrankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyheightrankingComponent]
    });
    fixture = TestBed.createComponent(MonthlyheightrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
