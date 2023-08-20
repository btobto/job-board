import { Injectable } from '@angular/core';
import { Company, CompanyRegister, Person, PersonRegister, User, UserLogin } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, delay, tap } from 'rxjs';
import { getUserType } from '../shared/helpers';
import { Exact } from '../shared/types';
import { UserType } from '../shared/enums/user-type.enum';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: UserLogin, isCompany: boolean): Observable<User> {
    const type = isCompany ? UserType.Company : UserType.Person;
    return this.http.post<User>(`${environment.apiUrl}/auth/${type}/login`, payload);
  }

  register(payload: PersonRegister | CompanyRegister): Observable<User> {
    const type = getUserType(payload);
    return this.http.post<User>(`${environment.apiUrl}/auth/${type}/register`, payload);
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem(USER_KEY);
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
