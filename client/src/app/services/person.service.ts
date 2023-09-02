import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, UpdatePersonDto } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/persons/${id}`);
  }

  updatePerson(id: string, dto: UpdatePersonDto): Observable<Person> {
    return this.http.patch<Person>(`${environment.apiUrl}/persons/${id}`, dto);
  }
}
