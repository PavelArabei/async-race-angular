import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';
import { WinnersHttpService } from '@winners/services/winners-http.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class LoadWinnersEffects {
  loadWinners$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.loadWinners),
      switchMap(() =>
        this.winnersHttpService.getWinners().pipe(
          map((cars) => {
            const newCars = cars.body || [];
            const totalCount = Number(cars.headers.get('X-Total-Count') || newCars.length);
            return WinnersHttpActions.loadWinnersSuccess({
              data: { winners: newCars, totalCount },
            });
          }),
          catchError((error: { message: string }) =>
            of(WinnersHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  constructor(
    private winnersHttpService: WinnersHttpService,
    private actions$: Actions
  ) {}
}
