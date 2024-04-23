import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadWinnersEffects } from './load-winners.effects';

describe('LoadWinnersEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadWinnersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadWinnersEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(LoadWinnersEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
