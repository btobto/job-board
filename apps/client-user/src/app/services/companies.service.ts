import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Company,
  CompanyCreateDto,
  CompanySearchQueryDto,
  CompanyUpdateDto,
} from '@nbp-it-job-board/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${environment.API_URL}/companies/${id}`);
  }

  search(dto: CompanySearchQueryDto) {
    return this.http.post<Company[]>(
      environment.API_URL + '/companies/search',
      dto,
      environment.HTTP_OPTIONS
    );
  }
}
