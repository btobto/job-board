import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Company, CompanySearchQuery, CompanyUpdateDto, Rating } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  getCompany(id: string): Observable<Company> {
    return this.apiService.get<Company>(`/companies/${id}`);
  }

  updateCompany(id: string, dto: CompanyUpdateDto): Observable<Company> {
    return this.apiService.patch<Company, CompanyUpdateDto>(`/companies/${id}`, dto);
  }

  deleteCompany(id: string) {
    return this.apiService.delete(`/companies/${id}`);
  }

  uploadImage(id: string, formData: FormData): Observable<Company> {
    return this.apiService.patch<Company, FormData>(`/companies/${id}/image`, formData);
  }

  getRating(id: string): Observable<Rating> {
    return this.apiService.get<Company>(`/companies/${id}/rating`);
  }

  search(query: CompanySearchQuery): Observable<Company[]> {
    return this.apiService.post<Company[], CompanySearchQuery>(`/companies/search`, query);
  }
}
