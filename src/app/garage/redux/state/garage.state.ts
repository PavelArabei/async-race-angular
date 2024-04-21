import { Car } from '@app/shared/types/car';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

export interface State {
  currentPage: number;
  totalCount: number;
  isLoading: boolean;
  cars: Car[];
  error: string | null;
}

export const initialState: State = {
  totalCount: 0,
  currentPage: 1,
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
      cars: data.cars,
      totalCount: data.totalCars,
    })
  ),

  on(
    GarageHttpActions.loadFailure,
    (state, { error }): State => ({
      ...state,
      isLoading: false,
      error,
    })
  ),
  on(
    GarageActions.nextPageGarageActions,
    (state, { data }): State => ({ ...state, currentPage: data })
  )
);

export const garageFeature = createFeature({
  name: 'garage',
  reducer,
  extraSelectors: ({ selectTotalCount, selectCurrentPage, selectCars }) => ({
    selectPageAndTotalCount: createSelector(
      selectTotalCount,
      selectCurrentPage,
      (totalCount, currentPage) => {
        return { totalCount, currentPage };
      }
    ),
    selectCarsInRace: createSelector(selectCars, (cars) => cars.length),
  }),
});
