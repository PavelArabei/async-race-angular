import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResizeEmitterService {
  private readonly carDistance$: BehaviorSubject<number> = new BehaviorSubject(0);
  get carDistance(): Observable<number> {
    return this.carDistance$.asObservable();
  }
  changeRoadSize(size: number) {
    if (size === this.carDistance$.value) return;
    this.carDistance$.next(size);
  }
}
