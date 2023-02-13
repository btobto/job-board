import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCreateDto, UserUpdateDto } from '@nbp-it-job-board/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public loggedInUser$ = new BehaviorSubject<User | null>(null);
  public fetchedUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const user = window.localStorage.getItem('user');

    if (user != null) {
      this.loggedInUser$.next(JSON.parse(user));
    }

    this.loggedInUser$.subscribe((user) => {
      if (user) {
        window.localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/${id}`).pipe(
      tap((user) => {
        this.fetchedUser$.next(user);
      })
    );
  }

  login(email: string): Observable<User> {
    return this.http
      .post<User>(
        environment.API_URL + '/users/login',
        email,
        environment.HTTP_OPTIONS
      )
      .pipe(
        tap((user) => {
          this.loggedInUser$.next(user);
        })
      );
  }

  register(dto: UserCreateDto): Observable<User> {
    return this.http
      .post<User>(
        environment.API_URL + '/user/register',
        dto,
        environment.HTTP_OPTIONS
      )
      .pipe(tap((user) => this.loggedInUser$.next(user)));
  }

  update(id: string, dto: UserUpdateDto): Observable<User> {
    return this.http
      .patch<User>(
        environment.API_URL + '/users/' + id,
        dto,
        environment.HTTP_OPTIONS
      )
      .pipe(tap((user) => this.loggedInUser$.next(user)));
  }

  delete(id: string) {
    return this.http.delete<User>(environment.API_URL + '/users/' + id);
  }

  logout() {
    window.localStorage.removeItem('user');
  }
}
