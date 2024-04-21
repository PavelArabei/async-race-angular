import { Injectable } from '@angular/core';
import { Car } from '@app/shared/types/car';
import { Winner } from '@app/shared/types/winner';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BigRaceService {
  private racesResultCount = 0;
  private totalRaceCount = 0;
  private totalRaceCount$ = this.store.select(garageFeature.selectCarsInRace);
  private resetBigRace = new Subject<boolean>();
  resetBigRace$ = this.resetBigRace.asObservable();
  private isWinnerSelected = false;
  private isBigRaceStarted = new BehaviorSubject<boolean>(false);
  isBigRaceStarted$ = this.isBigRaceStarted.asObservable();

  constructor(private store: Store) {
    this.subscribeToTotalRaceCount();
  }
  startBigRace() {
    this.isBigRaceStarted.next(true);
    this.isWinnerSelected = false;
  }

  stopBigRace() {
    this.racesResultCount += 1;
    if (this.racesResultCount === this.totalRaceCount) {
      this.isBigRaceStarted.next(false);
      this.racesResultCount = 0;
      this.isWinnerSelected = false;
    }
  }

  resetRace() {
    this.racesResultCount = 0;
    this.isWinnerSelected = false;
    this.resetBigRace.next(true);
  }
  addWinner({ id }: Car, time: number) {
    if (this.isWinnerSelected) return;
    const transformedTime = Number((time / 1000).toFixed(2));
    // TODO: add wins
    const winner: Winner = { wins: 0, id, time: transformedTime };
    console.log(winner);
    this.isWinnerSelected = true;
  }

  private subscribeToTotalRaceCount() {
    this.totalRaceCount$.subscribe((raceCount) => {
      this.totalRaceCount = raceCount;
    });
  }
}
