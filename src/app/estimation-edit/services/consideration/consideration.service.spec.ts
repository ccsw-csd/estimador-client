import { TestBed } from '@angular/core/testing';

import { ConsiderationService } from './consideration.service';

describe('ConsiderationService', () => {
  let service: ConsiderationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsiderationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
