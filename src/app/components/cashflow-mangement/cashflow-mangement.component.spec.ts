import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowMangementComponent } from './cashflow-mangement.component';

describe('CashflowMangementComponent', () => {
  let component: CashflowMangementComponent;
  let fixture: ComponentFixture<CashflowMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashflowMangementComponent]
    });
    fixture = TestBed.createComponent(CashflowMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
