import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models/user.interface';
import { UserSearchQueryDto } from './models/user-search-query.dto';
import { UserUpdateDto } from './models/user-update.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/users/${id}`);
  }

  search(dto: UserSearchQueryDto): Observable<User[]> {
    return this.http.post<User[]>(environment.api + '/users/search', dto);
  }

  update(id: string, dto: UserUpdateDto): Observable<User> {
    return this.http
      .patch<User>(environment.api + '/users/' + id, dto)
      .pipe(tap((user) => this.authService.loggedInUser$.next(user)));
  }

  delete(id: string) {
    return this.http
      .delete<User>(environment.api + '/users/' + id)
      .pipe(tap(() => this.authService.logout()));
  }
}
