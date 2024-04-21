import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { garageFeature } from '@garage/redux/state/garage.state';
import { Store } from '@ngrx/store';
import { carsFirsName, carsSecondName } from '@utils/constants/car-names';
import { RouterRoutes } from '@utils/constants/router-routes';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GarageHttpService {
  private readonly CURRENT_PATH = RouterRoutes.GARAGE;
  private LIMIT_PER_PAGE = 7;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getCars() {
    return this.getCurrentPage().pipe(
      switchMap((page) => {
        return this.http.get<Car[]>(`/${this.CURRENT_PATH}`, {
          params: { _page: page, _limit: this.LIMIT_PER_PAGE },
          observe: 'response',
        });
      })
    );
  }

  updateCar(car: Car) {
    return this.http.put<Car>(`/${this.CURRENT_PATH}/${car.id}`, car);
  }

  addCar(car: CarWithoutId) {
    return this.http.post<Car>(`/${this.CURRENT_PATH}`, car);
  }

  deleteCar(id: number) {
    return this.http.delete<Car>(`/${this.CURRENT_PATH}/${id}`);
  }

  getCar(id: number) {
    return this.http.get<Car>(`/${this.CURRENT_PATH}/${id}`);
  }

  addHundredCars() {
    const requests = Array.from({ length: 100 }, () => {
      const firsName = carsFirsName[Math.floor(Math.random() * carsFirsName.length)];
      const secondName = carsSecondName[Math.floor(Math.random() * carsSecondName.length)];
      const name = `${firsName} ${secondName}`;
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const car: CarWithoutId = { name, color };
      return this.addCar(car);
    });
    return forkJoin(requests);
  }

  private getCurrentPage(): Observable<number> {
    return this.store.select(garageFeature.selectCurrentPage);
  }
}
