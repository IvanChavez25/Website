import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BWIRTableComponent } from './bwir-table.component';

describe('BWIRTableComponent', () => {
  let component: BWIRTableComponent;
  let fixture: ComponentFixture<BWIRTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BWIRTableComponent]
    });
    fixture = TestBed.createComponent(BWIRTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
