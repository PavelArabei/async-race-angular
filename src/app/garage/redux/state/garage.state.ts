import { Car } from '@app/shared/types/car';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CAR_PAGE_SIZE } from '@utils/constants/variables';
import { updateCurrentPage } from '@utils/functions/update-page';

interface State {
  currentPage: number;
  totalCount: number;
  cars: Car[];
  error: string | null;
}

export const initialState: State = {
  totalCount: 0,
  currentPage: 1,
  cars: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(GarageHttpActions.loadCarsSuccess, (state, { data }): State => {
    return {
      ...state,
      cars: data.cars,
      totalCount: data.totalCars,
      currentPage: updateCurrentPage(state.currentPage, data.totalCars, CAR_PAGE_SIZE),
    };
  }),

  on(
    GarageHttpActions.loadFailure,
    (state, { error }): State => ({
      ...state,
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
