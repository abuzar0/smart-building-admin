import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment.development';
import { API_END_POINT } from '../../utils/end-points';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IUserData, IUserList } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private assigneeUser: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private userInfo: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(
    localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info') as string) as IUserData : null
  );

  private userProfile: BehaviorSubject<IUserList | null> = new BehaviorSubject<IUserList | null>(null)

  constructor(private _http: HttpService) { }

  createUser(body: Partial<any>) {
    return this._http.post(environment.baseUrl + API_END_POINT.USER.CREATE_USER, body)
  }

  getUserList<T>(): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.USER.LIST_USER}`);
  }


  deActiveUserAccount(id: string, body: Partial<any>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.USER.DE_ACTIVE_USER}/${id}`, body)
  }

  ActiveUserAccount(id: string, body: Partial<any>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.USER.ACTIVE_USER}/${id}`, body)
  }

  AssigneeBuildingUser(body: Partial<any>) {
    return this._http.post(`${environment.baseUrl}${API_END_POINT.USER.ASSIGNEE_USER_BUILDING}`, body)
  }


  getUserById<T>(id: string): Observable<HttpResponse<T>> {
    return this._http.get<T>(`${environment.baseUrl}${API_END_POINT.USER.USER_BY_ID}/${id}`);
  }


  updateUser(id: string, body: Partial<any>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.USER.UPDATE_USER_PERMISSION}/${id}`, body)
  }

  getAssigneeUsers(): Observable<string[]> {
    return this.assigneeUser.asObservable();
  }
  setAssigneeUsers(userId: string | string[],) {
    const currentValue = this.assigneeUser.value;
    const newValue = Array.isArray(userId) ? [...userId] : [...currentValue, userId];
    localStorage.setItem("assignee_User", JSON.stringify(newValue))
    this.assigneeUser.next(newValue);
  }

  getUserInfo(): Observable<IUserData | null> {
    return this.userInfo.asObservable();
  }

  setUserInfo(data: IUserData): void {
    localStorage.setItem("user_info", JSON.stringify(data));
    this.userInfo.next(data)
  }

  updateUserProfile(id: string, body: Partial<any>) {
    return this._http.patch(`${environment.baseUrl}${API_END_POINT.USER.UPDATE_USER_PROFILE}/${id}`, body)
  }
}
