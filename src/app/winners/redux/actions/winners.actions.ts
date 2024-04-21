import { WinnerWithoutWins } from '@app/shared/types/winner';
import { createActionGroup, props } from '@ngrx/store';

export const WinnersActions = createActionGroup({
  source: 'Winners',
  events: {
    'add winner': props<{ winner: WinnerWithoutWins }>(),
  },
});
