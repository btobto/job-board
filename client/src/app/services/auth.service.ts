import { Injectable } from '@angular/core';
import { CompanyRegister, PersonRegister, User, UserLogin } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, delay, tap } from 'rxjs';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: UserLogin, isCompany: boolean): Observable<User> {
    const type = isCompany ? 'company' : 'person';

    return this.http.post<User>(`${environment.apiUrl}/auth/${type}/login`, {
      email: payload.email,
      password: payload.password,
    });
  }

  logout() {}

  registerPerson(payload: PersonRegister) {}

  registerCompany(payload: CompanyRegister) {}

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

  autoLogin() {
    const user = localStorage.getItem(USER_KEY);

    if (!user) return;

    const userJson: User = JSON.parse(user);
  }
}
