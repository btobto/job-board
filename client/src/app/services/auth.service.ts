import { Injectable } from '@angular/core';
import { CompanyRegister, PersonRegister, User, UserLogin } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: UserLogin): Observable<User> {
    const type = payload.isCompany ? 'company' : 'person';

    return this.http
      .post<User>(`${environment.apiUrl}/auth/${type}/login`, {
        email: payload.email,
        password: payload.password,
      })
      .pipe(
        tap((user: User) => {
          // this.saveUser(user);
          console.log('login success', user);
        })
      );
  }

  logout() {}

  registerPerson(payload: PersonRegister) {}

  registerCompany(payload: CompanyRegister) {}

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {}
}
