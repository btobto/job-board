import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, PersonSearchQuery, PersonUpdateDto } from '../models';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private apiService: ApiService) {}

  getPerson(id: string): Observable<Person> {
    return this.apiService.get<Person>(`/persons/${id}`);
  }

  updatePerson(id: string, dto: PersonUpdateDto): Observable<Person> {
    return this.apiService.patch<Person, PersonUpdateDto>(`/persons/${id}`, dto);
  }

  deletePerson(id: string) {
    return this.apiService.delete(`/persons/${id}`);
  }

  uploadImage(id: string, formData: FormData): Observable<Person> {
    return this.apiService.patch<Person, FormData>(`/persons/${id}/image`, formData);
  }

  search(query: PersonSearchQuery): Observable<Person[]> {
    return this.apiService.post<Person[], PersonSearchQuery>(`/persons/search`, query);
  }
}
