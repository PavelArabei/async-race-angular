import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { carsFirsName, carsSecondName } from '@utils/constants/car-names';
import { RouterRoutes } from '@utils/constants/router-routes';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GarageHttpService {
  private readonly CURRENT_PATH = RouterRoutes.GARAGE;
  private readonly http = inject(HttpClient);

  getCars() {
    return this.http.get<Car[]>(`/${this.CURRENT_PATH}`);
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
}
