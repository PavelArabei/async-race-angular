import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@core/components/button/button.component';
import { UpgradeCarComponent } from '@garage/components/upgrade-car/upgrade-car.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { BigRaceService } from '@garage/services/big-race/big-race.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-garage-header',
  standalone: true,
  imports: [ButtonComponent, UpgradeCarComponent],
  templateUrl: './garage-header.component.html',
  styleUrl: './garage-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageHeaderComponent {
  private store = inject(Store);
  private bigRaceService = inject(BigRaceService);
  generateCars(): void {
    this.store.dispatch(GarageHttpActions.add100Cars());
  }

  startBigRace(): void {
    this.bigRaceService.startBigRace();
  }

  resetBigRace(): void {
    this.bigRaceService.resetRace();
  }
}
