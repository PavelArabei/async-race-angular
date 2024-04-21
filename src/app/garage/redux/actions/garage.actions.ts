import { createActionGroup, props } from '@ngrx/store';

export const GarageActions = createActionGroup({
  source: 'GarageAction',
  events: {
    'Next Page GarageActions': props<{ data: number }>(),
  },
});
