import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileComponent } from './family-profile.component';

describe('FamilyProfileComponent', () => {
  let component: FamilyProfileComponent;
  let fixture: ComponentFixture<FamilyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyProfileComponent]
    });
    fixture = TestBed.createComponent(FamilyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
