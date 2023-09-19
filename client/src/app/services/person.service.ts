import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, PersonSearchQuery, PersonUpdateDto } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/persons/${id}`);
  }

  updatePerson(id: string, dto: PersonUpdateDto): Observable<Person> {
    return this.http.patch<Person>(`${environment.apiUrl}/persons/${id}`, dto);
  }

  deletePerson(id: string) {
    return this.http.delete(`${environment.apiUrl}/persons/${id}`);
  }

  uploadImage(id: string, formData: FormData): Observable<Person> {
    return this.http.patch<Person>(`${environment.apiUrl}/persons/${id}/image`, formData);
  }

  search(query: PersonSearchQuery): Observable<Person[]> {
    return this.http.post<Person[]>(`${environment.apiUrl}/persons/search`, query);
  }
}
