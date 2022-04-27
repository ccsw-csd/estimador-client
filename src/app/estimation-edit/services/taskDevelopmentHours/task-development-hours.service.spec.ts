import { TestBed } from '@angular/core/testing';

import { TaskDevelopmentHoursService } from './task-development-hours.service';

describe('TaskDevelopmentService', () => {
  let service: TaskDevelopmentHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDevelopmentHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
