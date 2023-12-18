import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyweightrankingComponent } from './monthlyweightranking.component';

describe('MonthlyweightrankingComponent', () => {
  let component: MonthlyweightrankingComponent;
  let fixture: ComponentFixture<MonthlyweightrankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyweightrankingComponent]
    });
    fixture = TestBed.createComponent(MonthlyweightrankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
