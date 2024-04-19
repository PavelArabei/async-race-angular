import { Injectable } from '@angular/core';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { GarageHttpService } from '@garage/services/garage-http/garage-http.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class LoadCarsEffects {
  loadCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.loadCars),
      exhaustMap(() =>
        this.garageHttpService.getCars().pipe(
          map((cars) => {
            const newCars = cars.body || [];
            const totalCars = Number(cars.headers.get('X-Total-Count') || newCars.length);
            return GarageHttpActions.loadCarsSuccess({ data: { cars: newCars, totalCars } });
          }),
          catchError((error: { message: string }) =>
            of(GarageHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  addCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.addCar),
      exhaustMap(({ data }) =>
        this.garageHttpService.addCar(data).pipe(
          map(() => GarageHttpActions.addCarSuccess()),
          catchError((error: { message: string }) =>
            of(GarageHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  updateCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.updateCar),
      exhaustMap(({ data }) =>
        this.garageHttpService.updateCar(data).pipe(
          map((car) => GarageHttpActions.updateCarSuccess({ data: car })),
          catchError((error: { message: string }) =>
            of(GarageHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  deleteCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.deleteCar),
      exhaustMap(({ id }) =>
        this.garageHttpService.deleteCar(id).pipe(
          map(() => GarageHttpActions.deleteCarSuccess()),
          catchError((error: { message: string }) =>
            of(GarageHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  addHundredCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GarageHttpActions.add100Cars), // Тип действия, который активирует эффект
      exhaustMap(() =>
        this.garageHttpService.addHundredCars().pipe(
          map(() => GarageHttpActions.add100CarsSuccess()),
          catchError((error: { message: string }) =>
            of(GarageHttpActions.loadFailure({ error: error.message }))
          )
        )
      )
    );
  });

  handleAddCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        GarageHttpActions.addCarSuccess,
        GarageHttpActions.updateCarSuccess,
        GarageHttpActions.deleteCarSuccess,
        GarageHttpActions.add100CarsSuccess
      ),
      exhaustMap(() => of(GarageHttpActions.loadCars()))
    );
  });

  constructor(
    private garageHttpService: GarageHttpService,
    private actions$: Actions
  ) {}
}
