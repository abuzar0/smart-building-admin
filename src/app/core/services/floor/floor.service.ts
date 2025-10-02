import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IFloor, IFloorList } from '../../interfaces/IFloorType';
import { environment } from '../../../../environments/environment.development';
import { API_END_POINT } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private _http: HttpService) { }

  createFloor(body: Partial<IFloor>) {
    return this._http.post(environment.baseUrl + API_END_POINT.FLOOR.FLOOR, body)
  }

  updateFloor(id: string, body: Partial<IFloor | IFloorList>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR}/${id}`, body)
  }

  deleteFloor(id: string) {
    return this._http.delete(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR}/${id}`)
  }
  getFloorListByBuildingId<T>(buildingId: string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR_LIST}/${buildingId}`);
  }

  getFloorTypeByBuildingId<T>(buildingId: string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR_TYPE}/${buildingId}`);
  }
  getFloorMenuListByBuildingId<T>(buildingId: string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR_LIST_FLOOR}/${buildingId}`);
  }

  getFloorById<T>(id: string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR}/${id}`);
  }

  getFloorDetailByRoomAndDevices<T>(id: string,days:string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.FLOOR.FLOOR_DETAIL_BY_ROOM_DEVICE}/${id}?days=${days}`);
  }
}
