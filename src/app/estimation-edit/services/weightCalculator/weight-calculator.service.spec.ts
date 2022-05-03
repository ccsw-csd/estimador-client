import { TestBed } from '@angular/core/testing';

import { WeightCalculatorService } from './weight-calculator.service';

describe('WeightCalculatorService', () => {
  let service: WeightCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
