import { Winner } from '@app/shared/types/winner';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const WinnersHttpActions = createActionGroup({
  source: 'WinnersHttpActions',
  events: {
    'Load Winners': emptyProps(),
    'Load Winners Success': props<{ data: { winners: Winner[]; totalCount: number } }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
