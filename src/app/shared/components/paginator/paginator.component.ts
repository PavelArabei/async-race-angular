import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '@app/shared/services/paginator/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [AsyncPipe, MatPaginator],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  paginatorService = inject(PaginatorService);
  itemsLengthAndPage$!: Observable<{ totalCount: number; currentPage: number }>;
  pageSize!: number;

  ngOnInit(): void {
    this.itemsLengthAndPage$ = this.paginatorService.lengthAndPage$;
    this.pageSize = this.paginatorService.pageSize;
  }

  changePage($event: PageEvent) {
    this.paginatorService.changePage($event);
  }
}
