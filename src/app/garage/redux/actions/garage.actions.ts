import { Car } from '@app/shared/types/car';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GarageActions = createActionGroup({
  source: 'Garage',
  events: {
    'Load Garages': emptyProps(),
    'Load Garages Success': props<{ data: Car[] }>(),
    'Load Garages Failure': props<{ error: string }>(),
  },
});
