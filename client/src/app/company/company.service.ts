import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Company } from '../auth/models/company.interface';
import { CompanySearchQueryDto } from './models/company-search-query.dto';
import { CompanyUpdateDto } from './models/company-update.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get(id: string): Observable<Company> {
    return this.http.get<Company>(`${environment.api}/companies/${id}`);
  }

  search(dto: CompanySearchQueryDto): Observable<Company[]> {
    return this.http.post<Company[]>(
      environment.api + '/companies/search',
      dto
    );
  }

  update(id: string, dto: CompanyUpdateDto): Observable<Company> {
    return this.http
      .patch<Company>(environment.api + '/companies/' + id, dto)
      .pipe(
        tap((company) => {
          this.authService.updateUser(company);
        })
      );
  }

  delete(id: string) {
    return this.http
      .delete<Company>(environment.api + '/companies/' + id)
      .pipe(tap(() => this.authService.logout()));
  }
}
