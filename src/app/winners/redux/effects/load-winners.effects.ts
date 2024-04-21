import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
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
          map((response) => {
            const newCars = response.body || [];
            const totalCount = Number(response.headers.get('X-Total-Count') || newCars.length);
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

  newWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersActions.addWinner),
      switchMap(({ winner }) =>
        this.winnersHttpService.getWinner(winner.id).pipe(
          map((newWinner) => {
            const newTime = winner.time < newWinner.time ? winner.time : newWinner.time;
            return WinnersHttpActions.updateWinner({
              winner: { ...newWinner, wins: newWinner.wins + 1, time: newTime },
            });
          }),
          catchError(() =>
            of(WinnersHttpActions.createWinner({ winner: { wins: 1, time: winner.time } }))
          )
        )
      )
    );
  });

  updateWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.updateWinner),
      switchMap(({ winner }) =>
        this.winnersHttpService.updateWinner(winner, winner.id).pipe(
          map(() => WinnersHttpActions.loadWinners()),
          catchError((error: { message: string }) =>
            of(WinnersHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  createWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.createWinner),
      switchMap(({ winner }) =>
        this.winnersHttpService.createWinner(winner).pipe(
          map(() => WinnersHttpActions.loadWinners()),
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
