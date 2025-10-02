import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ILoginBody, ILoginResponse } from '../../interfaces/IUser';
import { environment } from '../../../../environments/environment.development';
import { API_END_POINT } from '../../utils/end-points';
import { Observable, of, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any | null = null;

  constructor(private _http: HttpService) { }

  login<T>(body: T): Observable<HttpResponse<T>> {
    return this._http.post<T>(environment.baseUrl + API_END_POINT.Auth.LOGIN, body);
  }

  logout<T>(body: T): Observable<HttpResponse<T>> {
    this.user=null;
    return this._http.post<T>(environment.baseUrl + API_END_POINT.Auth.LOGOUT, body);
  }

  getUser(): Observable<any> {
    if (this.user) return of(this.user); // cached
    return this._http.get(environment.baseUrl+'/auth/me').pipe(
      tap((user) => this.user = user)
    );
  }

  updatePassword<T>(body: T): Observable<HttpResponse<T>> {
    return this._http.post<T>(environment.baseUrl + API_END_POINT.Auth.UPDATE_PASSWORD, body);
  }
  forgotPassword<T>(body: T): Observable<HttpResponse<T>> {
    return this._http.post<T>(environment.baseUrl + API_END_POINT.Auth.FORGOT_PASSWORD, body);
  }

  resetPassword<T>(token: string, body: T): Observable<HttpResponse<T>> {
    return this._http.post<T>(`${environment.baseUrl + API_END_POINT.Auth.RESET_PASSWORD}/${token}`, body);
  }

}
