import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '@app/shared/services/paginator/paginator';
import { Store } from '@ngrx/store';
import { WINNERS_PAGE_SIZE } from '@utils/constants/variables';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { winnersFeature } from '@winners/redux/state/winners.state';

@Injectable()
export class WinnerPaginatorService implements PaginatorService {
  lengthAndPage$ = this.store.select(winnersFeature.selectPageAndTotalCount);
  pageSize = WINNERS_PAGE_SIZE;

  constructor(private store: Store) {}

  changePage($event: PageEvent): void {
    const newPage = $event.pageIndex + 1;
    this.store.dispatch(WinnersActions.nextPage({ data: newPage }));
  }
}
