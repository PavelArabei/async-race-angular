import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BigRaceService {
  private resetBigRace = new Subject<boolean>();
  resetBigRace$ = this.resetBigRace.asObservable();
  private isBigRaceStarted = new BehaviorSubject<boolean>(false);
  isBigRaceStarted$ = this.isBigRaceStarted.asObservable();

  startBigRace() {
    this.isBigRaceStarted.next(true);
  }

  stopBigRace() {
    this.isBigRaceStarted.next(false);
  }

  resetRace() {
    this.resetBigRace.next(true);
  }
}
