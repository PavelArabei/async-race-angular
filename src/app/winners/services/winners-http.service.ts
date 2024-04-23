import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Winner, WinnerWithoutId } from '@app/shared/types/winner';
import { Store } from '@ngrx/store';
import { RouterRoutes } from '@utils/constants/router-routes';
import { PAGE_SIZE } from '@utils/constants/variables';
import { winnersFeature } from '@winners/redux/state/winners.state';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WinnersHttpService {
  private readonly CURRENT_PATH = RouterRoutes.WINNERS;
  private LIMIT_PER_PAGE = PAGE_SIZE;
  private triggers = this.store.select(winnersFeature.selectTriggers);
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getWinners() {
    return this.triggers.pipe(
      switchMap(({ currentPage, sortType, OrderType }) => {
        return this.http.get<Winner[]>(`/${this.CURRENT_PATH}`, {
          params: {
            _page: currentPage,
            _sort: sortType,
            _order: OrderType,
            _limit: this.LIMIT_PER_PAGE,
          },
          observe: 'response',
        });
      })
    );
  }

  getWinner(id: number) {
    return this.http.get<Winner>(`/${this.CURRENT_PATH}/${id}`);
  }
  createWinner(winner: WinnerWithoutId) {
    return this.http.post<Winner>(`/${this.CURRENT_PATH}`, winner);
  }

  updateWinner(winner: WinnerWithoutId, id: number) {
    return this.http.put<Winner>(`/${this.CURRENT_PATH}/${id}`, winner);
  }

  deleteWinner(id: number) {
    return this.http.delete<Winner>(`/${this.CURRENT_PATH}/${id}`);
  }
}
