import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment.development';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINT } from '../../utils/end-points';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _http: HttpService) { }


  getNotificationList<T>(page?:number,limit?:number): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.NOTIFICATION.LIST_NOTIFICATION}?page=${page}&limit=${limit}`);
  }

  updateNotificationStatus(id: string) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.NOTIFICATION.UPDATE_NOTIFICATION_STATUS}/${id}`, {})
  }

  getNotificationById<T>(id:string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.NOTIFICATION.NOTIFICATION}/${id}`);
  }

}
