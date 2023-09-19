import { Injectable } from '@angular/core';
import { Company, CompanyRegister, Person, PersonRegister, User, UserLogin } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, delay, tap } from 'rxjs';
import { getUserType } from '../shared/helpers';
import { Exact } from '../shared/types';
import { UserType } from '../shared/enums';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  getUser(): Observable<User> {
    return this.apiService.get<User>('/auth/user');
  }

  login(payload: UserLogin, isCompany: boolean): Observable<User> {
    const type = isCompany ? UserType.Company : UserType.Person;
    return this.apiService.post<User, UserLogin>(`/auth/${type}/login`, payload);
  }

  register(payload: PersonRegister | CompanyRegister): Observable<User> {
    const type = getUserType(payload);
    return this.apiService.post<User, PersonRegister | CompanyRegister>(`/auth/${type}/register`, payload);
  }
}
