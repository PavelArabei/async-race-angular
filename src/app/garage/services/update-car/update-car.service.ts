import { Injectable } from '@angular/core';
import { Car } from '@app/shared/types/car';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateCarService {
  private readonly car$ = new BehaviorSubject<{ car: Car | null }>({
    car: null,
  });
  carObs$ = this.car$.asObservable();

  selectCar(car: Car) {
    this.car$.next({ car });
  }

  unselectCar() {
    this.car$.next({ car: null });
  }
}
