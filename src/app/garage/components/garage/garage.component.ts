import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GarageHeaderComponent } from '@garage/components/garage-header/garage-header.component';
import { PaginatorComponent } from '@garage/components/paginator/paginator.component';
import { RacesListComponent } from '@garage/components/races-list/races-list.component';
import { UpdateCarService } from '@garage/services/update-car/update-car.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RacesListComponent, GarageHeaderComponent, PaginatorComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
  providers: [UpdateCarService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {}
