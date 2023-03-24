import { TestBed } from '@angular/core/testing';

import { ScheduleFetchService } from './schedule-fetch.service';

describe('ScheduleFetchService', () => {
  let service: ScheduleFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
