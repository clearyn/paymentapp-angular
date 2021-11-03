import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailRegisterComponent } from './payment-detail-register.component';

describe('PaymentDetailRegisterComponent', () => {
  let component: PaymentDetailRegisterComponent;
  let fixture: ComponentFixture<PaymentDetailRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetailRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
