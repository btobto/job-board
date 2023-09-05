import { Injectable } from '@angular/core';
import { Company, CompanyRegister, Person, PersonRegister, User, UserLogin } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, delay, tap } from 'rxjs';
import { getUserType } from '../shared/helpers';
import { Exact } from '../shared/types';
import { UserType } from '../shared/enums/user-type.enum';

// const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/user`);
  }

  login(payload: UserLogin, isCompany: boolean): Observable<User> {
    const type = isCompany ? UserType.Company : UserType.Person;
    return this.http.post<User>(`${environment.apiUrl}/auth/${type}/login`, payload);
  }

  register(payload: PersonRegister | CompanyRegister): Observable<User> {
    const type = getUserType(payload);
    return this.http.post<User>(`${environment.apiUrl}/auth/${type}/register`, payload);
  }
}
