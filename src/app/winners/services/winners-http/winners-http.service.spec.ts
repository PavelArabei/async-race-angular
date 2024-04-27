import { TestBed } from '@angular/core/testing';

import { WinnersHttpService } from './winners-http.service';

describe('WinnersHttpService', () => {
  let service: WinnersHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnersHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
