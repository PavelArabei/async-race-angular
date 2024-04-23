import { Car, CarWithoutId } from '@app/shared/types/car';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UpgradeCarActions = createActionGroup({
  source: 'UpgradeCar',
  events: {
    'Select Upgraded Car': props<{ car: Car }>(),
    'Unselect Upgraded  Car': emptyProps(),
    'Clear Created Car': emptyProps(),
    'Update Created Car': props<{ data: CarWithoutId }>(),
  },
});
