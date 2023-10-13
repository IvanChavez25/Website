import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineWeightComponent } from './baseline-weight.component';

describe('BaselineWeightComponent', () => {
  let component: BaselineWeightComponent;
  let fixture: ComponentFixture<BaselineWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaselineWeightComponent]
    });
    fixture = TestBed.createComponent(BaselineWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
