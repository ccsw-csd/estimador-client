import { TestBed } from '@angular/core/testing';

import { TeamPyramidService } from './team-pyramid.service';

describe('TeamPyramidService', () => {
  let service: TeamPyramidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamPyramidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
