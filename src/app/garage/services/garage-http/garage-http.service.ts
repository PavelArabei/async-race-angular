import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car, CarWithoutId } from '@app/shared/types/car';
import { RouterRoutes } from '@utils/constants/router-routes';

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
}
