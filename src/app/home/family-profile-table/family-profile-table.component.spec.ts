import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProfileTableComponent } from './family-profile-table.component';

describe('FamilyProfileTableComponent', () => {
  let component: FamilyProfileTableComponent;
  let fixture: ComponentFixture<FamilyProfileTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyProfileTableComponent]
    });
    fixture = TestBed.createComponent(FamilyProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
