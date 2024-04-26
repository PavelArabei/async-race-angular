import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Winner, WinnerWithoutId } from '@app/shared/types/winner';
import { Store } from '@ngrx/store';
import { RouterRoutes } from '@utils/constants/router-routes';
import { WINNERS_PAGE_SIZE } from '@utils/constants/variables';
import { winnersFeature } from '@winners/redux/state/winners.state';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WinnersHttpService {
  private readonly CURRENT_PATH = RouterRoutes.WINNERS;
  private LIMIT_PER_PAGE = WINNERS_PAGE_SIZE;
  private triggers = this.store.select(winnersFeature.selectTriggers);
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getWinners(): Observable<HttpResponse<Winner[]>> {
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

  getWinner(id: number): Observable<Winner> {
    return this.http.get<Winner>(`/${this.CURRENT_PATH}/${id}`);
  }
  createWinner(winner: Winner): Observable<Winner> {
    return this.http.post<Winner>(`/${this.CURRENT_PATH}`, winner);
  }

  updateWinner(winner: WinnerWithoutId, id: number): Observable<Winner> {
    return this.http.put<Winner>(`/${this.CURRENT_PATH}/${id}`, winner);
  }

  deleteWinner(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(`/${this.CURRENT_PATH}/${id}`);
  }
}
