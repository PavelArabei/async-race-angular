import { Car, CarWithoutId } from '@app/shared/types/car';
import { UpgradeCarActions } from '@garage/redux/actions/upgrade-car.actions';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface State {
  createdCar: CarWithoutId;
  selectedCar: Car | null;
}

export const initialState: State = {
  selectedCar: null,
  createdCar: { name: '', color: '#000000' },
};

export const reducer = createReducer(
  initialState,
  on(
    UpgradeCarActions.selectUpgradedCar,
    (state, { car }): State => ({ ...state, selectedCar: car })
  ),
  on(UpgradeCarActions.unselectUpgradedCar, (state): State => ({ ...state, selectedCar: null })),
  on(
    UpgradeCarActions.updateCreatedCar,
    (state, { data }): State => ({ ...state, createdCar: data })
  ),
  on(
    UpgradeCarActions.clearCreatedCar,
    (state): State => ({ ...state, createdCar: { name: '', color: '#000000' } })
  )
);

export const carFeature = createFeature({
  name: 'car',
  reducer,
});
