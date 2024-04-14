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
  cars: [
    {
      name: 'Car 1',
      id: 1,
      color: 'red',
    },
  ],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(GarageActions.loadGarages, (state) => ({ ...state, isLoading: true })),
  on(GarageActions.loadGaragesSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    cars: data,
  })),
  on(GarageActions.loadGaragesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export const garageFeature = createFeature({
  name: 'garage',
  reducer,
});
