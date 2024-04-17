import { NgStyle, TitleCasePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Car } from '@app/shared/types/car';
import { ButtonComponent } from '@core/components/button/button.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [MatIcon, ButtonComponent, MatDivider, NgStyle, TitleCasePipe],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
})
export class RaceComponent {
  @Input({ required: true }) car!: Car;

  private readonly store: Store = inject(Store);
  private readonly updateCarService = inject(UpdateCarService);

  removeCar() {
    this.store.dispatch(GarageHttpActions.deleteCar({ id: this.car.id }));
  }

  selectCar() {
    this.updateCarService.selectCar(this.car);
  }
}
