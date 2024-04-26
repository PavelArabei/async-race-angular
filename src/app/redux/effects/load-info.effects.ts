import { Injectable } from '@angular/core';
import { LoadInfoActions } from '@app/redux/actions/load-info.actions';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';
import { mergeMap } from 'rxjs';

@Injectable()
export class LoadInfoEffects {
  loadInfoToState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoadInfoActions.loadInfo),
      mergeMap(() => [GarageHttpActions.loadCars(), WinnersHttpActions.loadWinners()])
    );
  });

  constructor(private actions$: Actions) {}
}
