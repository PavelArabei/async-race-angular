import { TestBed } from '@angular/core/testing';

import { RaceStateService } from './race-state.service';

describe('RaceStateService', () => {
  let service: RaceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
