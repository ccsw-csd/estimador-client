import { TestBed } from '@angular/core/testing';

import { EstimationEditService } from './estimation-edit.service';

describe('EstimationEditService', () => {
  let service: EstimationEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstimationEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
