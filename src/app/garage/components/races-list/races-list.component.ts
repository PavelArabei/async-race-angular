import { AsyncPipe } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Car } from '@app/shared/types/car';
import { RaceComponent } from '@garage/components/race/race.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RacesListComponent implements AfterViewChecked {
  @ViewChild('road') road!: ElementRef<HTMLDivElement>;

  private resizeEmitter = inject(ResizeEmitterService);
  private store = inject(Store);

  cars$: Observable<Car[]> = this.store.select(garageFeature.selectCars);

  @HostListener('window:resize')
  onResize(): void {
    this.changeRoadSize();
  }

  ngAfterViewChecked(): void {
    this.changeRoadSize();
  }

  private changeRoadSize(): void {
    const roadSize = this.road.nativeElement.offsetWidth;
    this.resizeEmitter.changeRoadSize(roadSize);
  }
}
