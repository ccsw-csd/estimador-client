import { TestBed } from '@angular/core/testing';

import { TaskDevelopmentWeightsService } from './task-development-weights.service';

describe('TaskDevelopmentWeightsService', () => {
  let service: TaskDevelopmentWeightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDevelopmentWeightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
