import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { WinnerInNecessaryFormat } from '@app/shared/types/winner';
import { Store } from '@ngrx/store';
import { WinnersActions } from '@winners/redux/actions/winners.actions';
import { winnersFeature, WinnersSort } from '@winners/redux/state/winners.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-winners-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    AsyncPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    NgStyle,
  ],
  templateUrl: './winners-list.component.html',
  styleUrl: './winners-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersListComponent {
  displayedColumns = ['id', 'car', 'name', 'wins', 'time'];
  private store = inject(Store);
  winners$: Observable<WinnerInNecessaryFormat[]> = this.store.select(winnersFeature.selectWinners);

  sort(sortType: WinnersSort): void {
    this.store.dispatch(WinnersActions.sortWinners({ data: sortType }));
  }
}
