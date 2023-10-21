import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalTableComponent } from './nutritional-table.component';

describe('NutritionalTableComponent', () => {
  let component: NutritionalTableComponent;
  let fixture: ComponentFixture<NutritionalTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalTableComponent]
    });
    fixture = TestBed.createComponent(NutritionalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
