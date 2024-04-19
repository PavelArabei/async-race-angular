import { NgStyle, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Car } from '@app/shared/types/car';
import { ButtonComponent } from '@core/components/button/button.component';
import { RaceStateService } from '@garage/components/race/services/race-state/race-state.service';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { RaceHttpService } from '@garage/services/race-http/race-http.service';
import { ResizeEmitterService } from '@garage/services/resize-emitter/resize-emitter.service';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';
import { AnimationState, carAnimation } from '@utils/functions/animate-car';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [MatIcon, ButtonComponent, MatDivider, NgStyle, TitleCasePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RaceStateService],
})
export class RaceComponent implements OnInit {
  @Input({ required: true }) car!: Car;
  isRaceStarted = false;
  @ViewChild('car') carImage!: MatIcon;
  private distance = 0;
  private animationState: AnimationState = { id: 0 };

  constructor(
    private readonly store: Store,
    private readonly updateCarService: UpdateCarService,
    private readonly resizeEmitter: ResizeEmitterService,
    private readonly raceHttpService: RaceHttpService,
    private readonly destroyRef: DestroyRef,
    private readonly raceStateService: RaceStateService
  ) {}

  ngOnInit(): void {
    this.getDistance();
    this.subscribeToRaceParams();
    this.subscribeToRaceResult();
  }

  getCarColor() {
    return this.car.color;
  }

  startRace() {
    this.isRaceStarted = true;
    this.raceStateService.startRace(this.car.id);
  }

  addCarToGarage() {
    this.stopRace();
    this.raceStateService.stopRace(this.car.id, this.carImage);
  }

  removeCar() {
    this.store.dispatch(GarageHttpActions.deleteCar({ id: this.car.id }));
  }

  selectCar() {
    this.updateCarService.selectCar(this.car);
  }

  private stopRace() {
    this.isRaceStarted = false;
    this.animationState.id = 0;
  }

  private getDistance() {
    this.resizeEmitter.carDistance
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((distance) => {
        this.distance = distance;
      });
  }

  private subscribeToRaceParams() {
    this.raceStateService.raceParams$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ velocity, distance }) => {
        const car = this.carImage._elementRef.nativeElement;
        const time = distance / velocity;
        this.animationState = carAnimation(car, this.distance, time);
        car.style.transform = `translateX(${this.distance}px)`;
      });
  }

  private subscribeToRaceResult() {
    this.raceStateService.raceResult$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (!result) this.stopRace();
      });
  }
}
