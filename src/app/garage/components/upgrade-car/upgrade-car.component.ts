import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { ButtonComponent } from '@core/components/button/button.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';

type CarForm = {
  name: FormControl<string>;
  color: FormControl<string>;
};
type UpgradeType = 'upgrade' | 'create';

@Component({
  selector: 'app-upgrade-car',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './upgrade-car.component.html',
  styleUrl: './upgrade-car.component.scss',
})
export class UpgradeCarComponent implements OnInit {
  @Input({ required: true }) upgradeType!: UpgradeType;

  isSelected = false;
  car: Car | null = null;
  form!: FormGroup<CarForm>;

  constructor(
    private readonly store: Store,
    private readonly fb: NonNullableFormBuilder,
    private readonly updateCarService: UpdateCarService,
    private readonly destroyRef: DestroyRef
  ) {}

  get nameControl() {
    return this.form.controls.name;
  }

  get colorControl() {
    return this.form.controls.color;
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribe();
  }

  submit() {
    const carWithoutId: CarWithoutId = this.form.getRawValue();
    if (this.upgradeType === 'create') {
      this.store.dispatch(GarageHttpActions.addCar({ data: carWithoutId }));
    } else {
      const car = { ...carWithoutId, id: this.car!.id };
      this.updateCarService.unselectCar();
      this.store.dispatch(GarageHttpActions.updateCar({ data: car }));
    }

    this.form.reset({ name: '', color: '#000000' });
  }

  initForm() {
    const isDisabled = !this.isSelected && this.upgradeType === 'upgrade';
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
  }

  private subscribe() {
    if (this.upgradeType === 'create') return;
    this.updateCarService.selectedCar.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((car) => {
      if (this.isSelected) {
        this.form.controls.name.setValue(car.name);
        this.form.controls.color.setValue(car.color);
      }

      this.car = car;
    });
    this.updateCarService.isSelected
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isSelected) => {
        if (isSelected) {
          this.form.controls.name.enable();
          this.form.controls.color.enable();
        } else {
          this.form.controls.name.disable();
          this.form.controls.color.disable();
        }
        this.isSelected = isSelected;
      });
  }
}
