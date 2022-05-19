import { TestBed } from '@angular/core/testing';

import { BlockCalculationService } from './block-calculation.service';

describe('BlockCalculationService', () => {
  let service: BlockCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
