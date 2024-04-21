import { Winner, WinnerWithoutId } from '@app/shared/types/winner';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const WinnersHttpActions = createActionGroup({
  source: 'WinnersHttpActions',
  events: {
    'Load Winners': emptyProps(),
    'Load Winners Success': props<{ data: { winners: Winner[]; totalCount: number } }>(),
    'Load Failure': props<{ error: string }>(),
    'Create Winner': props<{ winner: WinnerWithoutId }>(),
    'Update Winner': props<{ winner: Winner }>(),
    // 'Delete Winner': props<{ id: number }>(),
    // 'Load Winner': props<{ id: number }>(),
  },
});
