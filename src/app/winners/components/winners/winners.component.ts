import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { PaginatorService } from '@app/shared/services/paginator/paginator';
import { WinnersListComponent } from '@winners/components/winners-list/winners-list.component';
import { WinnerPaginatorService } from '@winners/services/winner-paginator/winner-paginator.service';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [WinnersListComponent, PaginatorComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss',
  providers: [
    {
      provide: PaginatorService,
      useClass: WinnerPaginatorService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WinnersComponent {}
