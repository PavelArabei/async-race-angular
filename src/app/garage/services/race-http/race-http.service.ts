import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RaceParams } from '@garage/components/race/services/race-state/race-state.service';
import { Observable } from 'rxjs';

export enum STATUS {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export type DriveResponse = {
  success: boolean;
};
@Injectable({
  providedIn: 'root',
})
export class RaceHttpService {
  private readonly CURRENT_PATH = 'engine';
  private readonly http = inject(HttpClient);

  startEngine(id: number): Observable<RaceParams> {
    return this.http.patch<RaceParams>(
      `/${this.CURRENT_PATH}`,
      {},
      { params: { status: STATUS.STARTED, id } }
    );
  }

  stopEngine(id: number): Observable<RaceParams> {
    return this.http.patch<RaceParams>(
      `/${this.CURRENT_PATH}`,
      {},
      { params: { status: STATUS.STOPPED, id } }
    );
  }

  drive(id: number): Observable<DriveResponse> {
    return this.http.patch<DriveResponse>(
      `/${this.CURRENT_PATH}`,
      {},
      { params: { status: STATUS.DRIVE, id } }
    );
  }
}
