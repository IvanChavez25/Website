import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyTableComponent } from './quarterly-table.component';

describe('QuarterlyTableComponent', () => {
  let component: QuarterlyTableComponent;
  let fixture: ComponentFixture<QuarterlyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyTableComponent]
    });
    fixture = TestBed.createComponent(QuarterlyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
