import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyinfantrankingComponent } from './monthlyinfantranking.component';

describe('MonthlyinfantrankingComponent', () => {
  let component: MonthlyinfantrankingComponent;
  let fixture: ComponentFixture<MonthlyinfantrankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyinfantrankingComponent]
    });
    fixture = TestBed.createComponent(MonthlyinfantrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
