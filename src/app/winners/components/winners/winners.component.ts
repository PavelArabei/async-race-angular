import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WinnersListComponent } from '@winners/components/winners-list/winners-list.component';
import { WinnersPaginatorComponent } from '@winners/components/winners-paginator/winners-paginator.component';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [WinnersListComponent, WinnersPaginatorComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersComponent {}
