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
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { ResizeEmitterService } from '@garage/services/resize-emitter/resize-emitter.service';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [MatIcon, ButtonComponent, MatDivider, NgStyle, TitleCasePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceComponent implements OnInit {
  @Input({ required: true }) car!: Car;
  isRaceStarted = false;
  @ViewChild('car') carImage!: MatIcon;
  private distance = 0;

  constructor(
    private readonly store: Store,
    private readonly updateCarService: UpdateCarService,
    private readonly resizeEmitter: ResizeEmitterService,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getDistance();
  }

  getCarColor() {
    return this.car.color;
  }

  startRace() {
    this.isRaceStarted = true;
    const car = this.carImage._elementRef.nativeElement;
    car.style.transform = `translateX(${this.distance}px)`;
  }
  stopRace() {
    this.isRaceStarted = false;
    const car = this.carImage._elementRef.nativeElement;
    car.style.transform = 'translateX(0px)';
  }

  removeCar() {
    this.store.dispatch(GarageHttpActions.deleteCar({ id: this.car.id }));
  }

  selectCar() {
    this.updateCarService.selectCar(this.car);
  }

  private getDistance() {
    this.resizeEmitter.carDistance
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((distance) => {
        this.distance = distance;
      });
  }
}
