import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyrankingDropdownComponent } from './monthlyranking-dropdown.component';

describe('MonthlyrankingDropdownComponent', () => {
  let component: MonthlyrankingDropdownComponent;
  let fixture: ComponentFixture<MonthlyrankingDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyrankingDropdownComponent]
    });
    fixture = TestBed.createComponent(MonthlyrankingDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
