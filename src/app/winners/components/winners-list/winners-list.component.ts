import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { WinnerInNecessaryFormat } from '@app/shared/types/winner';
import { Store } from '@ngrx/store';
import { winnersFeature, WinnersSort } from '@winners/redux/state/winners.state';
import { Observable } from 'rxjs';

// export interface PeriodicElement {
//   id: number;
//   wins: number;
//   time: number;
// }

export interface PeriodicElement {
  id: number;
  name: string;
  time: number;
  wins: number;
  car: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', wins: 2, time: 23, car: 'red' },
  { id: 2, name: 'Helium', wins: 2, time: 23, car: 'blue' },
  { id: 3, name: 'Lithium', wins: 2, time: 23, car: 'green' },
  { id: 4, name: 'Beryllium', wins: 2, time: 23, car: 'yellow' },
  { id: 5, name: 'Boron', wins: 2, time: 2, car: 'black' },
  { id: 6, name: 'Carbon', wins: 99, time: 43, car: 'white' },
  { id: 7, name: 'Nitrogen', wins: 92, time: 623, car: 'orange' },
  { id: 8, name: 'Oxygen', wins: 72, time: 2367, car: 'purple' },
  { id: 9, name: 'Fluorine', wins: 42, time: 223, car: 'pink' },
  { id: 10, name: 'Neon', wins: 32, time: 23, car: 'brown' },
];

@Component({
  selector: 'app-winners-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    AsyncPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    NgStyle,
  ],
  templateUrl: './winners-list.component.html',
  styleUrl: './winners-list.component.scss',
})
export class WinnersListComponent {
  displayedColumns = ['id', 'car', 'name', 'wins', 'time'];
  dataSource = ELEMENT_DATA;
  private store = inject(Store);
  winners$: Observable<WinnerInNecessaryFormat[]> = this.store.select(winnersFeature.selectWinners);

  sort(sortType: WinnersSort) {
    console.log(sortType);
  }
}
