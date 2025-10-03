import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment.development';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from '../../utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

 constructor(private _http: HttpService) { }

  getStatsSummery<T>(): Observable<HttpResponse<T>> {
     return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.STATS.STATS_LIST}`);
   }
}
