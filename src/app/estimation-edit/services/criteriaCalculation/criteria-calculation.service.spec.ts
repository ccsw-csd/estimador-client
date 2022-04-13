import { TestBed } from '@angular/core/testing';

import { CriteriaCalculationService } from './criteria-calculation.service';

describe('CriteriaCalculationService', () => {
  let service: CriteriaCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
