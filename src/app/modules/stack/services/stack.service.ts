import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStackStats } from '../interfaces/IStackStats';
import { IStackItem } from '../interfaces/IStackItem';
import { ApiService } from '@app/core/services/api.service';


@Injectable({
  providedIn: 'root',
})
export class StackService {

  constructor(private api: ApiService) {}

  getStats(): Observable<IStackStats> {
    return this.api.get('/stack/analytics/stats');
  }

  getHighestReputation(): Observable<IStackItem> {
    return this.api.get('/stack/analytics/highest-reputation');
  }

  getLowestViews(): Observable<IStackItem> {
    return this.api.get('/stack/analytics/lowest-views');
  }

  getOldest(): Observable<IStackItem> {
    return this.api.get('/stack/analytics/oldest');
  }

  getNewest(): Observable<IStackItem> {
    return this.api.get('/stack/analytics/newest');
  }
}