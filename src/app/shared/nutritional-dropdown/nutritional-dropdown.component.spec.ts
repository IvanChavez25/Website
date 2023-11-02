import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalDropdownComponent } from './nutritional-dropdown.component';

describe('NutritionalDropdownComponent', () => {
  let component: NutritionalDropdownComponent;
  let fixture: ComponentFixture<NutritionalDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalDropdownComponent]
    });
    fixture = TestBed.createComponent(NutritionalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
