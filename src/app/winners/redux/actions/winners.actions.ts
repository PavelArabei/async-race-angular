import { WinnerWithoutWins } from '@app/shared/types/winner';
import { createActionGroup, props } from '@ngrx/store';
import { WinnersSort } from '@winners/redux/state/winners.state';

export const WinnersActions = createActionGroup({
  source: 'Winners',
  events: {
    'add winner': props<{ winner: WinnerWithoutWins }>(),
    'sort winners': props<{ data: WinnersSort }>(),
  },
});
