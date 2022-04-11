import { TestBed } from '@angular/core/testing';

import { TaskArchitectureService } from './task-architecture.service';

describe('TaskArchitectureService', () => {
  let service: TaskArchitectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskArchitectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
