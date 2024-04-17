import { Car, CarWithoutId } from '@app/shared/types/car';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GarageHttpActions = createActionGroup({
  source: 'Garage',
  events: {
    'Load Cars': emptyProps(),
    'Load Cars Success': props<{ data: Car[] }>(),
    'Load Failure': props<{ error: string }>(),
    'Add Car': props<{ data: CarWithoutId }>(),
    'Add Car Success': emptyProps(),
    'Update Car': props<{ data: Car }>(),
    'Update Car Success': props<{ data: Car }>(),
    'Delete Car': props<{ id: number }>(),
    'Delete Car Success': emptyProps(),
  },
});
