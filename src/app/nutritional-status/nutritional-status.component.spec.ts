import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalStatusComponent } from './nutritional-status.component';

describe('NutritionalStatusComponent', () => {
  let component: NutritionalStatusComponent;
  let fixture: ComponentFixture<NutritionalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionalStatusComponent]
    });
    fixture = TestBed.createComponent(NutritionalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
