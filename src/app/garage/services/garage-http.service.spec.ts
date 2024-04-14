import { TestBed } from '@angular/core/testing';

import { GarageHttpService } from './garage-http.service';

describe('GarageHttpService', () => {
  let service: GarageHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
