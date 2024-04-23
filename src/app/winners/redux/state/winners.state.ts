import { WinnerInNecessaryFormat } from '@app/shared/types/winner';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { WINNERS_PAGE_SIZE } from '@utils/constants/variables';
import { updateCurrentPage } from '@utils/functions/update-page';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';

export type WinnersSort = 'id' | 'wins' | 'time';
export type WinnersOrder = 'ASC' | 'DESC';
export interface State {
  currentPage: number;
  totalCount: number;
  winners: WinnerInNecessaryFormat[];
  sort: WinnersSort;
  order: WinnersOrder;
  error: string | null;
}

export const initialState: State = {
  winners: [],
  currentPage: 1,
  totalCount: 0,
  sort: 'id',
  order: 'ASC',
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(
    WinnersHttpActions.loadWinnersInNecessaryFormat,
    (state, { data }): State => ({
      ...state,
      winners: data.winners,
      totalCount: data.totalCount,
      currentPage: updateCurrentPage(state.currentPage, data.totalCount, WINNERS_PAGE_SIZE),
    })
  ),
  on(WinnersActions.sortWinners, (state, { data }): State => {
    const isOrderChanged = state.sort === data;

    if (isOrderChanged) {
      return {
        ...state,
        order: state.order === 'ASC' ? 'DESC' : 'ASC',
      };
    }
    return {
      ...state,
      sort: data,
      order: 'ASC',
    };
  }),
  on(
    WinnersActions.nextPage,
    (state, { data }): State => ({
      ...state,
      currentPage: data,
    })
  )
);

export const winnersFeature = createFeature({
  name: 'winners',
  reducer,
  extraSelectors: ({ selectCurrentPage, selectSort, selectTotalCount, selectOrder }) => ({
    selectTriggers: createSelector(
      selectCurrentPage,
      selectSort,
      selectOrder,
      (currentPage, sortType, OrderType) => {
        return { currentPage, sortType, OrderType };
      }
    ),
    selectPageAndTotalCount: createSelector(
      selectTotalCount,
      selectCurrentPage,
      (totalCount, currentPage) => {
        return { totalCount, currentPage };
      }
    ),
  }),
});
