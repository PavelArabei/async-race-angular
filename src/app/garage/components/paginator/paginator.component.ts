import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  carsLengthAndPage$ = this.store.select(garageFeature.selectPageAndTotalCount);

  constructor(private store: Store) {}

  changePage(event: PageEvent) {
    const newPage = event.pageIndex + 1;
    this.store.dispatch(GarageActions.nextPageGarageActions({ data: newPage }));
  }
}
