import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { CAR_PAGE_SIZE } from '@utils/constants/variables';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginator, AsyncPipe],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  carsLengthAndPage$ = this.store.select(garageFeature.selectPageAndTotalCount);
  pageSize = CAR_PAGE_SIZE;
  constructor(private store: Store) {}

  changePage(event: PageEvent): void {
    const newPage = event.pageIndex + 1;
    this.store.dispatch(GarageActions.nextPageGarageActions({ data: newPage }));
  }
}
