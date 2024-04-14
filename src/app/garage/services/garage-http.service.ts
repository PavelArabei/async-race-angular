import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car } from '@app/shared/types/car';
import { RouterRoutes } from '@utils/constants/router-routes';

@Injectable({
  providedIn: 'root',
})
export class GarageHttpService {
  private readonly http = inject(HttpClient);

  getCars() {
    return this.http.get<Car[]>(`/${RouterRoutes.GARAGE}`);
  }
}
