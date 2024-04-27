import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '@app/shared/services/paginator/paginator';
import { GarageActions } from '@garage/redux/actions/garage.actions';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { CAR_PAGE_SIZE } from '@utils/constants/variables';

@Injectable()
export class CarPaginatorService implements PaginatorService {
  lengthAndPage$ = this.store.select(garageFeature.selectPageAndTotalCount);
  pageSize = CAR_PAGE_SIZE;

  constructor(private store: Store) {}

  changePage(event: PageEvent): void {
    const newPage = event.pageIndex + 1;
    this.store.dispatch(GarageActions.nextPageGarageActions({ data: newPage }));
  }
}
