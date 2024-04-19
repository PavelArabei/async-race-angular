import { TestBed } from '@angular/core/testing';

import { ResizeEmitterService } from './resize-emitter.service';

describe('ResizeEmitterService', () => {
  let service: ResizeEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
