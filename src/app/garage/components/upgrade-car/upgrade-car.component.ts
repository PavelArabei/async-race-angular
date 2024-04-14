import { Component, inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '@core/components/button/button.component';

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
export class UpgradeCarComponent {
  @Input() upgradeType: UpgradeType = 'create';
  private fb = inject(NonNullableFormBuilder);
  form: FormGroup<CarForm> = this.fb.group({
    name: this.fb.control(''),
    color: this.fb.control(''),
  });

  get nameControl() {
    return this.form.controls.name;
  }

  get colorControl() {
    return this.form.controls.color;
  }

  submit() {
    if (this.upgradeType === 'create') {
      // TODO: create car
    } else {
      // TODO: upgrade car
    }
  }
}
