import { TestBed } from '@angular/core/testing';

import { ElementWeightService } from './element-weight.service';

describe('ElementWeightService', () => {
  let service: ElementWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
