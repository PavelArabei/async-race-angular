import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BigRaceService {
  private isBigRaceStarted = new BehaviorSubject(false);
  isBigRaceStarted$ = this.isBigRaceStarted.asObservable();

  startBigRace() {
    this.isBigRaceStarted.next(true);
  }

  stopBigRace() {
    this.isBigRaceStarted.next(false);
  }
}
