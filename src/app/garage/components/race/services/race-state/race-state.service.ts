import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Car } from '@app/shared/types/car';
import { BigRaceService } from '@garage/services/big-race/big-race.service';
import { RaceHttpService } from '@garage/services/race-http/race-http.service';
import { ResizeEmitterService } from '@garage/services/resize-emitter/resize-emitter.service';
import { AnimationState, carAnimation } from '@utils/functions/animate-car';
import { BehaviorSubject, catchError, of } from 'rxjs';

export type RaceParams = { velocity: number; distance: number };

@Injectable()
export class RaceStateService {
  private isRaceStarted = new BehaviorSubject(false);
  private carHTML!: HTMLElement;
  private car!: Car;
  private destroyRef!: DestroyRef;
  private distance = 0;
  private animationState: AnimationState = { id: 0 };
  private isBigRace: boolean = false;
  private time = 0;

  constructor(
    private raceHttpService: RaceHttpService,
    private resizeEmitter: ResizeEmitterService,
    private bigRaceService: BigRaceService
  ) {
    this.subscribeToBigRaceService();
  }

  getRaceStatus() {
    return this.isRaceStarted.asObservable();
  }

  addCarAndId(carHTML: HTMLElement, car: Car) {
    this.carHTML = carHTML;
    this.car = car;
  }

  addDestroyRef(destroyRef: DestroyRef) {
    this.destroyRef = destroyRef;
  }

  addDistance() {
    this.resizeEmitter.carDistance
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((distance) => {
        this.distance = distance;
      });
  }

  startRace(id: number) {
    const raceSubscription = this.raceHttpService
      .startEngine(id)
      .subscribe(({ distance, velocity }) => {
        this.time = distance / velocity;
        this.animationState = carAnimation(this.carHTML, this.distance, this.time);
        this.isRaceStarted.next(true);
        this.drive(id);

        raceSubscription.unsubscribe();
      });
  }

  stopRace(id: number) {
    const raceHttpSubscription = this.raceHttpService
      .stopEngine(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe((e) => {
        console.log(e);
        this.isRaceStarted.next(false);
        this.animationState.id = 0;
        this.time = 0;
        this.carHTML.style.transform = 'translateX(0px)';
        raceHttpSubscription.unsubscribe();
      });
  }

  private drive(id: number) {
    const raceHttpSubscription = this.raceHttpService
      .drive(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe((raceParams) => {
        if (raceParams instanceof HttpErrorResponse) {
          this.animationState.id = 0;
        } else if (this.isBigRace) {
          this.bigRaceService.addWinner(this.car, this.time);
        }
        this.bigRaceService.stopBigRace();
        raceHttpSubscription.unsubscribe();
      });
  }

  private subscribeToBigRaceService() {
    this.bigRaceService.isBigRaceStarted$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isBigRace) => {
        this.isBigRace = isBigRace;
        if (this.isBigRace) {
          this.startRace(this.car.id);
        }
      });
    this.bigRaceService.resetBigRace$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.stopRace(this.car.id);
    });
  }
}
