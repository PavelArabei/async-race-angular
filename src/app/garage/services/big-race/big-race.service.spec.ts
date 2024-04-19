import { TestBed } from '@angular/core/testing';

import { BigRaceService } from './big-race.service';

describe('BigRaceService', () => {
  let service: BigRaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigRaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
