import { Car, CarWithoutId } from '@app/shared/types/car';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const GarageHttpActions = createActionGroup({
  source: 'Garage',
  events: {
    'Load Cars': emptyProps(),
    'Load Cars Success': props<{ data: { cars: Car[]; totalCars: number } }>(),
    'Load Failure': props<{ error: string }>(),
    'Add Car': props<{ data: CarWithoutId }>(),
    'Add Car Success': emptyProps(),
    'Update Car': props<{ data: Car }>(),
    'Update Car Success': props<{ data: Car }>(),
    'Delete Car': props<{ id: number }>(),
    'Delete Car Success': props<{ id: number }>(),
    'Add 100 Cars': emptyProps(),
    'Add 100 Cars Success': emptyProps(),
  },
});
