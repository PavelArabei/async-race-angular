import { TestBed } from '@angular/core/testing';

import { RaceHttpService } from './race-http.service';

describe('RaceHttpService', () => {
  let service: RaceHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
