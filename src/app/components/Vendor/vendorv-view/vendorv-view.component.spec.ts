import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorvViewComponent } from './vendorv-view.component';

describe('VendorvViewComponent', () => {
  let component: VendorvViewComponent;
  let fixture: ComponentFixture<VendorvViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorvViewComponent]
    });
    fixture = TestBed.createComponent(VendorvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
