import { Injectable } from '@angular/core';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { GarageHttpService } from '@garage/services/garage-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class LoadCarsEffects {
  loadCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageActions.loadGarages),
      exhaustMap(() =>
        this.garageHttpService.getCars().pipe(
          map((cars) => GarageActions.loadGaragesSuccess({ data: cars })),
          catchError((error: { message: string }) =>
            of(GarageActions.loadGaragesFailure({ error: error.message }))
          )
        )
      )
    );
  });

  constructor(
    private garageHttpService: GarageHttpService,
    private actions$: Actions
  ) {}
}
