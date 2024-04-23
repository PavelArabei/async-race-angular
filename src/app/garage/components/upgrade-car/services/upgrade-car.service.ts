import { ChangeDetectorRef, DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { UpgradeType } from '@garage/components/upgrade-car/upgrade-car.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';

export type CarForm = {
  name: FormControl<string>;
  color: FormControl<string>;
};
@Injectable()
export class UpgradeCarService {
  private car: Car | null = null;
  private form!: FormGroup<CarForm>;
  private isSelected = false;
  private isDisabled = false;
  private upgradeType!: UpgradeType;
  constructor(
    private readonly store: Store,
    private readonly fb: NonNullableFormBuilder,
    private readonly updateCarService: UpdateCarService,
    private readonly destroyRef: DestroyRef
  ) {}

  initForm(upgradeType: UpgradeType, cdr: ChangeDetectorRef) {
    this.isDisabled = !this.isSelected && upgradeType === 'upgrade';
    this.upgradeType = upgradeType;
    this.form = this.fb.group({
      name: this.fb.control({
        value: '',
        disabled: this.isDisabled,
      }),
      color: this.fb.control({
        value: '#000000',
        disabled: this.isDisabled,
      }),
    });
    this.subscribe(cdr);
    return this.form;
  }

  submit() {
    const carWithoutId: CarWithoutId = this.form.getRawValue();
    if (this.upgradeType === 'create') {
      this.store.dispatch(GarageHttpActions.addCar({ data: carWithoutId }));
    } else if (this.car) {
      const updatedCar: Car = { ...carWithoutId, id: this.car.id };
      this.updateCarService.unselectCar();
      this.store.dispatch(GarageHttpActions.updateCar({ data: updatedCar }));
    }

    this.form.reset({ name: '', color: '#000000' });
  }

  subscribe(cdr: ChangeDetectorRef) {
    if (this.upgradeType === 'create') return;
    this.subscribeToIsSelectedCar();
    this.subscribeToSelectedCar(cdr);
  }

  private subscribeToIsSelectedCar() {
    this.updateCarService.selectedCar.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((car) => {
      if (this.isSelected) {
        this.form.controls.name.setValue(car.name);
        this.form.controls.color.setValue(car.color);
      }

      this.car = car;
    });
  }

  private subscribeToSelectedCar(cdr: ChangeDetectorRef) {
    this.updateCarService.isSelected
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isSelected) => {
        if (isSelected) {
          this.isDisabled = false;
          this.form.controls.name.enable();
          this.form.controls.color.enable();
        } else {
          this.isDisabled = true;
          this.form.controls.name.disable();
          this.form.controls.color.disable();
        }
        this.isSelected = isSelected;
        cdr.markForCheck();
      });
  }
}
