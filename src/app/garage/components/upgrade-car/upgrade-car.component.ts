import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@core/components/button/button.component';
import {
  CarForm,
  UpgradeCarService,
} from '@garage/components/upgrade-car/services/upgrade-car.service';

export type UpgradeType = 'upgrade' | 'create';

@Component({
  selector: 'app-upgrade-car',
  standalone: true,
  imports: [ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './upgrade-car.component.html',
  styleUrl: './upgrade-car.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UpgradeCarService],
})
export class UpgradeCarComponent implements OnInit {
  @Input({ required: true }) upgradeType!: UpgradeType;

  form!: FormGroup<CarForm>;

  constructor(
    private cdr: ChangeDetectorRef,
    private upgradeCarService: UpgradeCarService
  ) {}

  get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }

  get colorControl(): FormControl<string> {
    return this.form.controls.color;
  }

  get isDisabled(): boolean {
    return this.form.controls.name.disabled;
  }

  ngOnInit(): void {
    this.form = this.upgradeCarService.initForm(this.upgradeType, this.cdr);
  }

  submit(): void {
    this.upgradeCarService.submit();
  }
}
