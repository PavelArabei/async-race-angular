import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { WINNERS_PAGE_SIZE } from '@utils/constants/variables';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { winnersFeature } from '@winners/redux/state/winners.state';

@Component({
  selector: 'app-winners-paginator',
  standalone: true,
  imports: [AsyncPipe, MatPaginator],
  templateUrl: './winners-paginator.component.html',
  styleUrl: './winners-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersPaginatorComponent {
  winnersLengthAndPage$ = this.store.select(winnersFeature.selectPageAndTotalCount);
  pageSize = WINNERS_PAGE_SIZE;

  constructor(private store: Store) {}

  changePage($event: PageEvent): void {
    const newPage = $event.pageIndex + 1;
    this.store.dispatch(WinnersActions.nextPage({ data: newPage }));
  }
}
