import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Car } from '@app/shared/types/car';
import { RaceComponent } from '@garage/components/race/race.component';
import { GarageHttpActions } from '@garage/redux/actions/garageHttpActions';
import { garageFeature } from '@garage/redux/state/garage.state';
import { ResizeEmitterService } from '@garage/services/resize-emitter/resize-emitter.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-races-list',
  standalone: true,
  imports: [AsyncPipe, RaceComponent, MatDivider],
  templateUrl: './races-list.component.html',
  styleUrl: './races-list.component.scss',
})
export class RacesListComponent implements OnInit, AfterViewInit {
  @ViewChild('road') road!: ElementRef<HTMLDivElement>;

  private resizeEmitter = inject(ResizeEmitterService);
  private store = inject(Store);
  cars$: Observable<Car[]> = this.store.select(garageFeature.selectCars);

  @HostListener('window:resize')
  onResize() {
    this.changeRoadSize();
  }

  ngOnInit(): void {
    this.store.dispatch(GarageHttpActions.loadCars());
  }

  ngAfterViewInit(): void {
    this.changeRoadSize();
  }

  private changeRoadSize() {
    const roadSize = this.road.nativeElement.clientWidth;
    this.resizeEmitter.changeRoadSize(roadSize);
  }
}
