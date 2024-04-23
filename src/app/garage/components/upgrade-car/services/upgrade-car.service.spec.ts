import { TestBed } from '@angular/core/testing';

import { UpgradeCarService } from './upgrade-car.service';

describe('UpgradeCarService', () => {
  let service: UpgradeCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpgradeCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
