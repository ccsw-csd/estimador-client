import { TestBed } from '@angular/core/testing';

import { GradeWorkDaysCalculationService } from './grade-work-days-calculation.service';

describe('GradeWorkDaysCalculationService', () => {
  let service: GradeWorkDaysCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeWorkDaysCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
