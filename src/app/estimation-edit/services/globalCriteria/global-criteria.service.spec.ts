import { TestBed } from '@angular/core/testing';

import { GlobalCriteriaService } from './global-criteria.service';

describe('GlobalCriteriaService', () => {
  let service: GlobalCriteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCriteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
