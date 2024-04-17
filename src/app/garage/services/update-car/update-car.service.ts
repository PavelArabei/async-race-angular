import { Injectable } from '@angular/core';
import { Car } from '@app/shared/types/car';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UpdateCarService {
  private readonly isSelected$ = new BehaviorSubject(false);
  isSelected = this.isSelected$.asObservable();
  private car$ = new BehaviorSubject({} as Car);
  selectedCar = this.car$.asObservable();

  selectCar(car: Car) {
    this.isSelected$.next(true);
    this.car$.next(car);
  }

  unselectCar() {
    this.isSelected$.next(false);
    this.car$.next({} as Car);
  }
}
