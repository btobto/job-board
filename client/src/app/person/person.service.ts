import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Person } from '../auth/models/person.interface';
import { PersonSearchQueryDto } from './models/person-search-query.dto';
import { PersonUpdateDto } from './models/person-update.dto';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get(id: string): Observable<Person> {
    return this.http.get<Person>(`${environment.api}/users/${id}`);
  }

  search(dto: PersonSearchQueryDto): Observable<Person[]> {
    return this.http.post<Person[]>(environment.api + '/users/search', dto);
  }

  update(id: string, dto: PersonUpdateDto): Observable<Person> {
    return this.http
      .patch<Person>(environment.api + '/users/' + id, dto)
      .pipe(tap((person) => this.authService.loggedInUser$.next(person)));
  }

  delete(id: string) {
    return this.http
      .delete<Person>(environment.api + '/users/' + id)
      .pipe(tap(() => this.authService.logout()));
  }
}
