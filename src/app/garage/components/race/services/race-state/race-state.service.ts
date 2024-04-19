import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RaceHttpService } from '@garage/services/race-http/race-http.service';
import { catchError, of, Subject } from 'rxjs';

export type RaceParams = { velocity: number; distance: number };

@Injectable()
export class RaceStateService {
  private raceParams: Subject<RaceParams> = new Subject();
  raceParams$ = this.raceParams.asObservable();
  private raceResult: Subject<boolean> = new Subject();
  raceResult$ = this.raceResult.asObservable();

  constructor(private raceHttpService: RaceHttpService) {}

  startRace(id: number) {
    const raceSubscription = this.raceHttpService.startEngine(id).subscribe((raceParams) => {
      this.raceParams.next(raceParams);
      this.drive(id);
      raceSubscription.unsubscribe();
    });
  }

  stopRace(id: number, carImage: MatIcon) {
    const car = carImage._elementRef.nativeElement;
    this.raceHttpService
      .stopEngine(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe(() => {
        this.raceResult.next(false);
        car.style.transform = 'translateX(0px)';
      });
  }

  private drive(id: number) {
    this.raceHttpService
      .drive(id)
      .pipe(catchError((error: HttpErrorResponse) => of(error)))
      .subscribe((raceParams) => {
        if (raceParams instanceof HttpErrorResponse) {
          this.raceResult.next(false);
        } else {
          this.raceResult.next(true);
        }
      });
  }
}
