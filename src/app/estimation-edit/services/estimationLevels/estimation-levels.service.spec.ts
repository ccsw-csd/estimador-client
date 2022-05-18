import { TestBed } from '@angular/core/testing';

import { EstimationLevelsService } from './estimation-levels.service';

describe('EstimationLevelsService', () => {
  let service: EstimationLevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimationLevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
