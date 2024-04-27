import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

export abstract class PaginatorService {
  abstract pageSize: number;

  abstract lengthAndPage$: Observable<{ totalCount: number; currentPage: number }>;

  abstract changePage(event: PageEvent): void;
}
