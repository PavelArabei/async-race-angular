import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadCarsEffects } from './load-cars.effects';

describe('LoadCarsEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadCarsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadCarsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(LoadCarsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
