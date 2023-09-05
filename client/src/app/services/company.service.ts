import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, UpdateCompanyDto } from '../models';
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

  updateCompany(id: string, dto: UpdateCompanyDto): Observable<Company> {
    return this.http.patch<Company>(`${environment.apiUrl}/companies/${id}`, dto);
  }

  deleteCompany(id: string) {
    return this.http.delete(`${environment.apiUrl}/companies/${id}`);
  }
}
