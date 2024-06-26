import { ChangeDetectorRef, DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { UpgradeType } from '@garage/components/upgrade-car/upgrade-car.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { UpgradeCarActions } from '@garage/redux/actions/upgrade-car.actions';
import { carFeature } from '@garage/redux/state/update-car.state';
import { Store } from '@ngrx/store';

export type CarForm = {
  name: FormControl<string>;
  color: FormControl<string>;
};

@Injectable()
export class UpgradeCarService {
  private car: Car | null = null;
  private form!: FormGroup<CarForm>;
  private upgradeType!: UpgradeType;

  constructor(
    private readonly store: Store,
    private readonly fb: NonNullableFormBuilder,
    private readonly destroyRef: DestroyRef
  ) {}

  initForm(upgradeType: UpgradeType, cdr: ChangeDetectorRef): FormGroup<CarForm> {
    const isDisabled = upgradeType === 'upgrade';
    this.upgradeType = upgradeType;

    this.form = this.fb.group({
      name: this.fb.control({
        value: '',
        disabled: isDisabled,
      }),
      color: this.fb.control({
        value: '#000000',
        disabled: isDisabled,
      }),
    });

    this.subscribe(cdr);
    return this.form;
  }

  submit(): void {
    const carWithoutId: CarWithoutId = this.form.getRawValue();

    if (this.upgradeType === 'create') {
      this.store.dispatch(GarageHttpActions.addCar({ data: carWithoutId }));
    } else if (this.car) {
      const updatedCar: Car = { ...carWithoutId, id: this.car.id };
      this.store.dispatch(GarageHttpActions.updateCar({ data: updatedCar }));
    }

    this.form.reset({ name: '', color: '#000000' });
  }

  subscribe(cdr: ChangeDetectorRef): void {
    if (this.upgradeType === 'create') this.subscribeToCreatedCar();
    else this.subscribeToUpdateCar(cdr);
  }

  private subscribeToUpdateCar(cdr: ChangeDetectorRef): void {
    const { name, color } = this.form.controls;
    const selectedCar$ = this.store.select(carFeature.selectSelectedCar);
    selectedCar$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((car) => {
      if (car) {
        this.car = car;
        name.enable();
        color.enable();
      } else {
        this.car = null;
        name.disable();
        color.disable();
      }
      name.setValue(car?.name || '');
      color.setValue(car?.color || '#000000');

      cdr.markForCheck();
    });
  }

  private subscribeToCreatedCar(): void {
    const { name, color } = this.form.controls;
    const createdCar$ = this.store.select(carFeature.selectCreatedCar);

    createdCar$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((car) => {
      if (name.value !== car.name || color.value !== car.color) {
        name.setValue(car.name);
        color.setValue(car.color);
      }
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.store.dispatch(
        UpgradeCarActions.updateCreatedCar({
          data: { name: value.name || '', color: value.color || '#000000' },
        })
      );
    });
  }
}
