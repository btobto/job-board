import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person, Posting, PostingDto } from '../models';
import { environment } from 'src/environments/environment';
import { excludeFromPostingInterceptor } from '../interceptors';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private http: HttpClient) {}

  getCompanyPostings(companyId: string): Observable<Posting[]> {
    return this.http.get<Posting[]>(`${environment.apiUrl}/postings/company/${companyId}`);
  }

  getPosting(id: string): Observable<Posting> {
    return this.http.get<Posting>(`${environment.apiUrl}/postings/${id}`);
  }

  createPosting(payload: PostingDto): Observable<Posting> {
    return this.http.post<Posting>(`${environment.apiUrl}/postings`, payload);
  }

  updatePosting(postingId: string, payload: PostingDto): Observable<Posting> {
    return this.http.patch<Posting>(`${environment.apiUrl}/postings/${postingId}`, payload);
  }

  toggleApply(postingId: string): Observable<Posting> {
    return this.http.patch<Posting>(`${environment.apiUrl}/postings/${postingId}/application`, null);
  }

  deletePosting(id: string) {
    return this.http.delete(`${environment.apiUrl}/postings/${id}`);
  }

  getApplicants(id: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/postings/${id}/applicants`, {
      context: excludeFromPostingInterceptor(),
    });
  }
}
