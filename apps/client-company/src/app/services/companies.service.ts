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
  public loggedInCompany$ = new BehaviorSubject<Company | null>(null);

  constructor(private http: HttpClient) {
    const company = window.localStorage.getItem('company');

    if (company != null) {
      this.loggedInCompany$.next(JSON.parse(company));
    }

    this.loggedInCompany$.subscribe((company) => {
      if (company) {
        window.localStorage.setItem('company', JSON.stringify(company));
      }
    });
  }

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

  login(email: string): Observable<Company> {
    return this.http
      .post<Company>(
        environment.API_URL + '/companies/login',
        email,
        environment.HTTP_OPTIONS
      )
      .pipe(
        tap((user) => {
          this.loggedInCompany$.next(user);
        })
      );
  }

  register(dto: CompanyCreateDto): Observable<Company> {
    return this.http
      .post<Company>(
        environment.API_URL + '/companies/register',
        dto,
        environment.HTTP_OPTIONS
      )
      .pipe(tap((user) => this.loggedInCompany$.next(user)));
  }

  logout() {
    window.localStorage.removeItem('user');
  }

  update(id: string, dto: CompanyUpdateDto): Observable<Company> {
    return this.http
      .patch<Company>(
        environment.API_URL + '/companies/' + id,
        dto,
        environment.HTTP_OPTIONS
      )
      .pipe(tap((user) => this.loggedInCompany$.next(user)));
  }

  delete(id: string) {
    return this.http.delete<Company>(environment.API_URL + '/companies/' + id);
  }
}
