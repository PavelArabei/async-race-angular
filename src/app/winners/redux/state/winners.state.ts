import { Winner } from '@app/shared/types/winner';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';

export type WinnersSort = 'id' | 'wins' | 'time';
export type WinnersOrder = 'ASC' | 'DESC';
export interface State {
  currentPage: number;
  totalCount: number;
  winners: Winner[];
  sort: WinnersSort;
  order: WinnersOrder;
  error: string | null;
}

export const initialState: State = {
  winners: [],
  currentPage: 1,
  totalCount: 0,
  sort: 'wins',
  order: 'ASC',
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(WinnersHttpActions.loadWinnersSuccess, (state, { data }) => ({
    ...state,
    winners: data.winners,
    totalCount: data.totalCount,
  }))
);

export const winnersFeature = createFeature({
  name: 'winners',
  reducer,
  extraSelectors: ({ selectCurrentPage, selectSort, selectOrder }) => ({
    selectTriggers: createSelector(
      selectCurrentPage,
      selectSort,
      selectOrder,
      (currentPage, sortType, OrderType) => {
        return { currentPage, sortType, OrderType };
      }
    ),
  }),
});
