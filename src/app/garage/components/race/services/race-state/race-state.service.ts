import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BigRaceService } from '@garage/services/big-race/big-race.service';
import { RaceHttpService } from '@garage/services/race-http/race-http.service';
import { ResizeEmitterService } from '@garage/services/resize-emitter/resize-emitter.service';
import { AnimationState, carAnimation } from '@utils/functions/animate-car';
import { BehaviorSubject, catchError, of } from 'rxjs';

export type RaceParams = { velocity: number; distance: number };

@Injectable()
export class RaceStateService {
  private isRaceStarted = new BehaviorSubject(false);
  private car!: HTMLElement;
  private carId!: number;
  private destroyRef!: DestroyRef;
  private distance = 0;
  private animationState: AnimationState = { id: 0 };
  private isBigRace: boolean = false;

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

  //
  addCarAndId(car: HTMLElement, id: number) {
    this.car = car;
    this.carId = id;
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
        const time = distance / velocity;
        this.animationState = carAnimation(this.car, this.distance, time);
        this.isRaceStarted.next(true);
        this.drive(id);
        raceSubscription.unsubscribe();
      });
  }

  stopRace(id: number) {
    this.raceHttpService
      .stopEngine(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe(() => {
        this.isRaceStarted.next(false);
        this.animationState.id = 0;
        this.car.style.transform = 'translateX(0px)';
      });
  }

  private drive(id: number) {
    this.raceHttpService
      .drive(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe((raceParams) => {
        if (raceParams instanceof HttpErrorResponse) {
          this.animationState.id = 0;
        } else if (this.isBigRace) {
          this.bigRaceService.stopBigRace();
        }
      });
  }

  private subscribeToBigRaceService() {
    this.bigRaceService.isBigRaceStarted$.subscribe((isBigRace) => {
      this.isBigRace = isBigRace;
      if (this.isBigRace) {
        this.startRace(this.carId);
      }
    });
    this.bigRaceService.resetBigRace$.subscribe(() => {
      this.stopRace(this.carId);
    });
  }
}
