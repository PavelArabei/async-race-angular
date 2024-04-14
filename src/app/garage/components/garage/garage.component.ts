import { Component } from '@angular/core';
import { GarageHeaderComponent } from '@garage/components/garage-header/garage-header.component';
import { RacesListComponent } from '@garage/components/races-list/races-list.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [RacesListComponent, GarageHeaderComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss',
})
export class GarageComponent {}
