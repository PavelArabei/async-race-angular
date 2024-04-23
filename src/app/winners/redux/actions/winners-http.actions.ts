import { Winner, WinnerInNecessaryFormat, WinnerWithoutId } from '@app/shared/types/winner';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const WinnersHttpActions = createActionGroup({
  source: 'WinnersHttpActions',
  events: {
    'Load Winners': emptyProps(),
    'Load Winners Success': props<{ winners: Winner[]; totalCount: number }>(),
    'load WinnersIn Necessary Format': props<{
      data: { winners: WinnerInNecessaryFormat[]; totalCount: number };
    }>(),
    'Load Failure': props<{ error: string }>(),
    'Create Winner': props<{ winner: WinnerWithoutId }>(),
    'Update Winner': props<{ winner: Winner }>(),
    'Update Winner Success': emptyProps(),
    'Create Winner Success': emptyProps(),
    'Check Winner': props<{ id: number }>(),
    'Delete Winner ': props<{ id: number }>(),
    'Delete Winner Success': emptyProps(),
  },
});
