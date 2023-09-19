import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpGetOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, opts?: HttpGetOptions): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${url}`, opts);
  }

  post<T, D>(url: string, data?: D): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, data);
  }

  patch<T, D>(url: string, data?: D): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl}${url}`, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${url}`);
  }
}
