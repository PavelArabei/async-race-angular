import { TestBed } from '@angular/core/testing';

import { CarPaginatorService } from './car-paginator.service';

describe('CarPaginatorService', () => {
  let service: CarPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
