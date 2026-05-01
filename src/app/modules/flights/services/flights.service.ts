import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { Observable } from 'rxjs';
import { ITopAirport } from '../interfaces/ITopAirport';
import { ITopAirline } from '../interfaces/ITopAirline';
import { ITopDay } from '../interfaces/ITopDay';
import { IAirlineOverTwo } from '../interfaces/IAirlineOverTwo';


@Injectable({
  providedIn: 'root',
})

export class FlightsService {
  constructor(private api: ApiService) {}

  getTopAirports(): Observable<ITopAirport> {
    console.log('Fetching top airports:', new Date().toISOString());
    return this.api.get<ITopAirport>('/flights/analytics/top-airport');
  }

  getTopAirlines(): Observable<ITopAirline> {
    console.log('Fetching top airlines:', new Date().toISOString());
    return this.api.get<ITopAirline>('/flights/analytics/top-airline');
  }

  getTopDays(): Observable<ITopDay> {
    return this.api.get<ITopDay>('/flights/analytics/top-day');
  }

  getAirlinesOverTwo(): Observable<IAirlineOverTwo[]> {
    return this.api.get<IAirlineOverTwo[]>('/flights/analytics/airlines-over-two');
  }
}