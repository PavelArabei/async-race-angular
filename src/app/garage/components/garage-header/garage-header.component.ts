import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@core/components/button/button.component';
import { UpgradeCarComponent } from '@garage/components/upgrade-car/upgrade-car.component';

@Component({
  selector: 'app-garage-header',
  standalone: true,
  imports: [ButtonComponent, UpgradeCarComponent],
  templateUrl: './garage-header.component.html',
  styleUrl: './garage-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageHeaderComponent {}
