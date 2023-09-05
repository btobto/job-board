import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${environment.apiUrl}/companies/${id}`);
  }
}
