import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  get<T>(url: string, params?: HttpParams, options?: object): Observable<HttpResponse<T>> {
    return this._http.get<T>(url, {
      observe: 'response',
      withCredentials: true,
      params,
      ...options
    });
  }

  patch<T>(url: string, body: T, options?: object): Observable<HttpResponse<T>> {
    return this._http.patch<T>(url, body, {
      observe: 'response',
      withCredentials: true,
      ...options
    });
  }

  delete<T>(url: string, options?: object): Observable<HttpResponse<T>> {
    return this._http.delete<T>(url, {
      observe: 'response',
      withCredentials: true,
      ...options
    });
  }

  post<T>(url: string, body: T, options?: object): Observable<HttpResponse<T>> {
    return this._http.post<T>(url, body, {
      observe: 'response',
      withCredentials: true,
      ...options
    });
  }

}
