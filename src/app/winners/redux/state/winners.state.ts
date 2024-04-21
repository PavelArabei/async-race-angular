import { Winner } from '@app/shared/types/winner';
import { createFeature, createReducer, createSelector } from '@ngrx/store';

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
  sort: 'time',
  order: 'ASC',
  error: null,
};

export const reducer = createReducer(initialState);

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
