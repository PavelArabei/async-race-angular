import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Car } from '@app/shared/types/car';
import { RaceComponent } from '@garage/components/race/race.component';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-races-list',
  standalone: true,
  imports: [AsyncPipe, RaceComponent, MatDivider],
  templateUrl: './races-list.component.html',
  styleUrl: './races-list.component.scss',
})
export class RacesListComponent implements OnInit {
  private store = inject(Store);
  cars$: Observable<Car[]> = this.store.select(garageFeature.selectCars);

  ngOnInit(): void {
    this.store.dispatch(GarageActions.loadCars());
  }
}
