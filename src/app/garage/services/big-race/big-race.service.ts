import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from '@app/shared/types/car';
import { NewWinner, WinnerWithoutWins } from '@app/shared/types/winner';
import { DialogComponent } from '@garage/components/dialog/dialog.component';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

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
  private httpSubscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
    this.subscribeToTotalRaceCount();
  }
  startBigRace(): void {
    this.clearSubscriptions();
    this.isBigRaceStarted.next(true);
    this.isWinnerSelected = false;
  }

  stopBigRace(): void {
    if (!this.isBigRaceStarted.value) return;
    this.racesResultCount += 1;
    if (this.racesResultCount === this.totalRaceCount) {
      this.clearSubscriptions();
      this.setStateToStop();
    }
  }

  resetRace(): void {
    this.setStateToStop();
    this.resetBigRace.next(true);
  }

  addWinner({ id, name }: Car, time: number): void {
    if (this.isWinnerSelected) return;

    const transformedTime = Number((time / 1000).toFixed(2));
    const winner: WinnerWithoutWins = { id, time: transformedTime };
    this.store.dispatch(WinnersActions.addWinner({ winner }));

    this.isBigRaceStarted.next(false);
    this.isWinnerSelected = true;

    this.openDialog({ name, time: transformedTime });
  }

  addHttpSubscription(subscription: Subscription): void {
    this.httpSubscriptions.push(subscription);
  }

  private setStateToStop(): void {
    this.isBigRaceStarted.next(false);
    this.racesResultCount = 0;
    this.isWinnerSelected = false;
  }

  private clearSubscriptions(): void {
    this.httpSubscriptions.forEach((subscription) => subscription.unsubscribe());
    this.httpSubscriptions = [];
  }

  private subscribeToTotalRaceCount(): void {
    this.totalRaceCount$.subscribe((raceCount) => {
      this.totalRaceCount = raceCount;
    });
  }

  private openDialog(winner: NewWinner): void {
    this.dialog.open(DialogComponent, { data: winner, width: '400px' });
  }
}
