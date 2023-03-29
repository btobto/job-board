import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../common/types';
import { Company } from './models/company.interface';
import { CompanyRegisterDto } from './models/company.register.dto';
import { Person } from './models/person.interface';
import { PersonRegisterDto } from './models/person.register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('user');

    if (user) {
      this.loggedInUser$.next(JSON.parse(user));
    }

    this.loggedInUser$.subscribe((user) => {
      if (user) {
        this.saveUser(user);
      }
    });
  }

  loginPerson(email: string, password: string) {
    return this.http
      .post<Person>(`${environment.api}/auth/user/login`, {
        email,
        password,
      })
      .pipe(
        tap((person) => {
          this.saveUser(person);
          this.loggedInUser$.next(person);

          console.log(person);
        })
      );
  }

  loginCompany(email: string, password: string) {
    return this.http
      .post<Company>(`${environment.api}/auth/company/login`, {
        email,
        password,
      })
      .pipe(
        tap((company) => {
          this.saveUser(company);
          this.loggedInUser$.next(company);

          console.log(company);
        })
      );
  }

  registerPerson(dto: PersonRegisterDto) {
    console.log(dto);
    return this.http
      .post<void>(`${environment.api}/auth/user/register`, dto)
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/login');
        })
      );
  }

  registerCompany(dto: CompanyRegisterDto) {
    return this.http.post(`${environment.api}/auth/company/register`, dto).pipe(
      tap(() => {
        this.router.navigateByUrl('/login');
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
