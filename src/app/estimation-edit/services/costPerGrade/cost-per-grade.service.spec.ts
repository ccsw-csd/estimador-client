import { TestBed } from '@angular/core/testing';

import { CostPerGradeService } from './cost-per-grade.service';

describe('CostPerGradeService', () => {
  let service: CostPerGradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostPerGradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
