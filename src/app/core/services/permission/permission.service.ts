import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment.development';
import { API_END_POINT } from '../../utils/end-points';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _http: HttpService) { }

  createPermission(body: Partial<any>) {
    return this._http.post(environment.baseUrl + API_END_POINT.PERMISSION.CREATE_PERMISSION, body)
  }

  getPermissionList<T>(): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.PERMISSION.LIST_PERMISSION}`);
  }
  getPermissionMenuList<T>(): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.PERMISSION.MENU_LIST_PERMISSION}`);
  }
  deletePermission(id: string) {
    return this._http.delete(`${environment.baseUrl}${API_END_POINT.PERMISSION.DELETE_PERMISSION}/${id}`)
  }
}
