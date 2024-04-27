import { TestBed } from '@angular/core/testing';

import { WinnerPaginatorService } from './winner-paginator.service';

describe('WinnerPaginatorService', () => {
  let service: WinnerPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
