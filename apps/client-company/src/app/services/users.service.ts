import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  User,
  UserCreateDto,
  UserSearchQueryDto,
  UserUpdateDto,
} from '@nbp-it-job-board/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/${id}`);
  }

  search(dto: UserSearchQueryDto) {
    return this.http.post<User[]>(
      environment.API_URL + '/users/search',
      dto,
      environment.HTTP_OPTIONS
    );
  }
}
