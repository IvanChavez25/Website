import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarangayRankingbmiComponent } from './barangay-rankingbmi.component';

describe('BarangayRankingbmiComponent', () => {
  let component: BarangayRankingbmiComponent;
  let fixture: ComponentFixture<BarangayRankingbmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarangayRankingbmiComponent]
    });
    fixture = TestBed.createComponent(BarangayRankingbmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
