import { TestBed } from '@angular/core/testing';

import { PaymentdetailService } from './paymentdetail.service';

describe('PaymentdetailService', () => {
  let service: PaymentdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
