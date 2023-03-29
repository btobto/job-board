import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from './models/company.interface';
import { CompanyRegisterDto } from './models/company.register.dto';
import { UserBase } from './models/user-base.interface';
import { User } from './models/user.interface';
import { UserRegisterDto } from './models/user.register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedInUser$ = new BehaviorSubject<UserBase | null>(null);

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

  loginUser(email: string, password: string) {
    return this.http
      .post<User>(`${environment.api}/auth/user/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          this.saveUser(user);
          this.loggedInUser$.next(user);

          console.log(user);
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

  registerUser(dto: UserRegisterDto) {
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

  saveUser(user: UserBase) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
