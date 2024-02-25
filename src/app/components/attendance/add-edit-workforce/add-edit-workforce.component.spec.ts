import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkforceComponent } from './add-edit-workforce.component';

describe('AddEditWorkforceComponent', () => {
  let component: AddEditWorkforceComponent;
  let fixture: ComponentFixture<AddEditWorkforceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditWorkforceComponent]
    });
    fixture = TestBed.createComponent(AddEditWorkforceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
