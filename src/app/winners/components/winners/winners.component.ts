import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { WinnersListComponent } from '@winners/components/winners-list/winners-list.component';
import { WinnersPaginatorComponent } from '@winners/components/winners-paginator/winners-paginator.component';
import { WinnersHttpActions } from '@winners/redux/actions/winners-http.actions';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [WinnersListComponent, WinnersPaginatorComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersComponent {
  private store = inject(Store);
  constructor() {
    this.store.dispatch(WinnersHttpActions.loadWinners());
  }
}
