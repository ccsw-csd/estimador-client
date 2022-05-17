import { TestBed } from '@angular/core/testing';

import { FteCalculationService } from './fte-calculation.service';

describe('FteCalculationService', () => {
  let service: FteCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FteCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
