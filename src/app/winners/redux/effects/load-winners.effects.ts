import { Injectable } from '@angular/core';
import { WinnerInNecessaryFormat } from '@app/shared/types/winner';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { GarageHttpService } from '@garage/services/garage-http/garage-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';
import { WinnersHttpService } from '@winners/services/winners-http/winners-http.service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

@Injectable()
export class LoadWinnersEffects {
  loadWinners$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.loadWinners),
      switchMap(() =>
        this.winnersHttpService.getWinners().pipe(
          map((response) => {
            const winners = response.body || [];
            const totalCount = Number(response.headers.get('X-Total-Count') || winners.length);
            if (!winners.length)
              return WinnersHttpActions.loadWinnersInNecessaryFormat({
                data: { winners: [], totalCount },
              });
            return WinnersHttpActions.loadWinnersSuccess({
              winners,
              totalCount,
            });
          }),

          catchError((error: { message: string }) =>
            of(WinnersHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  loadWinnersInNecessaryFormat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.loadWinnersSuccess),
      switchMap(({ winners, totalCount }) => {
        const requestArray = winners.map((winner) => {
          return this.garageHttpService.getCar(winner.id);
        });

        return forkJoin(requestArray).pipe(
          map((cars) => {
            const newWinners: WinnerInNecessaryFormat[] = winners.map((winner, index) => {
              return { ...winner, ...cars[index] };
            });

            return WinnersHttpActions.loadWinnersInNecessaryFormat({
              data: { winners: newWinners, totalCount },
            });
          })
        );
      })
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
            of(
              WinnersHttpActions.createWinner({
                winner: { wins: 1, time: winner.time, id: winner.id },
              })
            )
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
          map(() => WinnersHttpActions.updateWinnerSuccess()),
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
          map(() => WinnersHttpActions.createWinnerSuccess()),
          catchError((error: { message: string }) =>
            of(WinnersHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  checkIsWinnerExistWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.deleteCarSuccess),
      switchMap(({ id }) => {
        return this.winnersHttpService.getWinner(id).pipe(
          map(() => WinnersHttpActions.deleteWinner({ id })),
          catchError((error: { message: string }) => {
            return of(WinnersHttpActions.loadFailure({ error: error.message }));
          })
        );
      })
    );
  });

  deleteWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WinnersHttpActions.deleteWinner),
      switchMap(({ id }) =>
        this.winnersHttpService.deleteWinner(id).pipe(
          map(() => WinnersHttpActions.deleteWinnerSuccess()),
          catchError((error: { message: string }) =>
            of(WinnersHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  updateState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        WinnersHttpActions.deleteWinnerSuccess,
        WinnersHttpActions.createWinnerSuccess,
        WinnersHttpActions.updateWinnerSuccess
      ),
      map(() => WinnersHttpActions.loadWinners())
    );
  });

  constructor(
    private winnersHttpService: WinnersHttpService,
    private garageHttpService: GarageHttpService,
    private actions$: Actions
  ) {}
}
