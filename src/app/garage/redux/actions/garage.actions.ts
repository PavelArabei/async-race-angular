import { Car } from '@app/shared/types/car';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GarageActions = createActionGroup({
  source: 'Garage',
  events: {
    'Load Cars': emptyProps(),
    'Load Cars Success': props<{ data: Car[] }>(),
    'Load Cars Failure': props<{ error: string }>(),
  },
});
