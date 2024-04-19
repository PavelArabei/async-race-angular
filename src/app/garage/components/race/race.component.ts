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
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  isRaceStarted$!: Observable<boolean>;
  @ViewChild('car') carImage!: MatIcon;
  protected readonly Boolean = Boolean;

  constructor(
    private readonly store: Store,
    private readonly updateCarService: UpdateCarService,
    private readonly destroyRef: DestroyRef,
    private readonly raceStateService: RaceStateService
  ) {}

  ngOnInit(): void {
    this.isRaceStarted$ = this.raceStateService.getRaceStatus();
  }

  ngAfterViewInit(): void {
    this.addRequiredParamsToRaceState();
  }

  getCarColor() {
    return this.car.color;
  }

  startRace() {
    this.raceStateService.startRace(this.car.id);
  }

  addCarToGarage() {
    this.raceStateService.stopRace(this.car.id);
  }

  removeCar() {
    this.store.dispatch(GarageHttpActions.deleteCar({ id: this.car.id }));
  }

  selectCar() {
    this.updateCarService.selectCar(this.car);
  }

  private addRequiredParamsToRaceState() {
    this.raceStateService.addCarAndId(this.carImage._elementRef.nativeElement, this.car.id);
    this.raceStateService.addDestroyRef(this.destroyRef);
    this.raceStateService.addDistance();
  }
}
