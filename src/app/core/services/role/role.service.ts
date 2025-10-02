import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IRole } from '../../interfaces/IUser';
import { environment } from '../../../../environments/environment.development';
import { API_END_POINT } from '../../utils/end-points';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpService) { }

  createRole(body: Partial<IRole>) {
    return this._http.post(environment.baseUrl + API_END_POINT.ROLE.CREATE_ROLE, body)
  }


  getRoleList<T>(): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.ROLE.LIST_ROLE}`);
  }

  getRoleById<T>(id:string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.ROLE.ROLE_BY_ID}/${id}`);
  }

  getRoleMenuList<T>(): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.ROLE.LIST_MENU_ROLE}`);
  }
  updateRole(id: string, body: Partial<any>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.ROLE.UPDATE_ROLE}/${id}`, body)
  }

  deleteRole(id: string) {
    return this._http.delete(`${environment.baseUrl}${API_END_POINT.ROLE.DELETE_ROLE}/${id}`)
  }
}
