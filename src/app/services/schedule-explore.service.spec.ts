import { TestBed } from '@angular/core/testing';

import { ScheduleExploreService } from './schedule-explore.service';

describe('ScheduleExploreService', () => {
  let service: ScheduleExploreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleExploreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
