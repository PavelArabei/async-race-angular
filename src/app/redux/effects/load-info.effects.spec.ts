import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadInfoEffects } from './load-info.effects';

describe('LoadInfoEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadInfoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadInfoEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(LoadInfoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
