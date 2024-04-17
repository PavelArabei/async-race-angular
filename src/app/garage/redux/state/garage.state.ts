import { Car } from '@app/shared/types/car';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface State {
  isLoading: boolean;
  cars: Car[];
  error: string | null;
}

export const initialState: State = {
  isLoading: false,
  cars: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(GarageActions.loadCars, (state): State => ({ ...state, isLoading: true })),
  on(
    GarageActions.loadCarsSuccess,
    (state, { data }): State => ({
      ...state,
      isLoading: false,
      cars: data,
    })
  ),
  on(
    GarageActions.loadCarsFailure,
    (state, { error }): State => ({
      ...state,
      isLoading: false,
      error,
    })
  )
);

export const garageFeature = createFeature({
  name: 'garage',
  reducer,
});
