import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorComponent } from '@app/shared/components/paginator/paginator.component';
import { PaginatorService } from '@app/shared/services/paginator/paginator';
import { GarageHeaderComponent } from '@garage/components/garage-header/garage-header.component';
import { RacesListComponent } from '@garage/components/races-list/races-list.component';
import { CarPaginatorService } from '@garage/services/car-paginator/car-paginator.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RacesListComponent, GarageHeaderComponent, PaginatorComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
  providers: [
    {
      provide: PaginatorService,
      useClass: CarPaginatorService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarageComponent {}
