import { AsyncPipe, NgStyle, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Car } from '@app/shared/types/car';
import { ButtonComponent } from '@core/components/button/button.component';
import { RaceStateService } from '@garage/components/race/services/race-state/race-state.service';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { UpgradeCarActions } from '@garage/redux/actions/upgrade-car.actions';
import { carFeature } from '@garage/redux/state/update-car.state';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [MatIcon, ButtonComponent, MatDivider, NgStyle, TitleCasePipe, AsyncPipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RaceStateService],
})
export class RaceComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) car!: Car;
  isSelected: Observable<boolean> = this.store
    .select(carFeature.selectSelectedCar)
    .pipe(map((car: Car | null) => !!(car && car.id === this.car.id)));
  isRaceStarted$!: Observable<boolean>;

  @ViewChild('car') carImage!: MatIcon;

  constructor(
    private readonly store: Store,
    private readonly destroyRef: DestroyRef,
    private readonly raceStateService: RaceStateService
  ) {}

  ngOnInit(): void {
    this.isRaceStarted$ = this.raceStateService.getRaceStatus();
  }

  ngAfterViewInit(): void {
    this.addRequiredParamsToRaceState();
  }

  getCarColor(): string {
    return this.car.color;
  }

  startRace(): void {
    this.raceStateService.startRace(this.car.id);
  }

  addCarToGarage(): void {
    this.raceStateService.stopRace(this.car.id);
  }

  removeCar(): void {
    this.store.dispatch(GarageHttpActions.deleteCar({ id: this.car.id }));
  }

  selectCar(): void {
    this.store.dispatch(UpgradeCarActions.selectUpgradedCar({ car: this.car }));
  }

  private addRequiredParamsToRaceState(): void {
    this.raceStateService.addCarAndId(this.carImage._elementRef.nativeElement, this.car);
    this.raceStateService.addDestroyRef(this.destroyRef);
    this.raceStateService.addDistance();
  }
}
