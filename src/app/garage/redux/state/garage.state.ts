import { Car } from '@app/shared/types/car';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
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
  on(GarageHttpActions.loadCars, (state): State => ({ ...state, isLoading: true })),
  on(
    GarageHttpActions.loadCarsSuccess,
    (state, { data }): State => ({
      ...state,
      isLoading: false,
      cars: data,
    })
  ),

  on(
    GarageHttpActions.loadFailure,
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
