import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Posting, PostingDto } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private http: HttpClient) {}

  getCompanyPostings(companyId: string): Observable<Posting[]> {
    return this.http
      .get<Posting[]>(`${environment.apiUrl}/postings/company/${companyId}`)
      .pipe(map((postings) => postings.map((posting) => this.transformPosting(posting))));
  }

  getPosting(id: string): Observable<Posting> {
    return this.http
      .get<Posting>(`${environment.apiUrl}/postings/${id}`)
      .pipe(map((posting) => this.transformPosting(posting)));
  }

  createPosting(payload: PostingDto): Observable<Posting> {
    return this.http
      .post<Posting>(`${environment.apiUrl}/postings`, payload)
      .pipe(map((posting) => this.transformPosting(posting)));
  }

  updatePosting(postingId: string, payload: PostingDto): Observable<Posting> {
    return this.http
      .patch<Posting>(`${environment.apiUrl}/postings/${postingId}`, payload)
      .pipe(map((posting) => this.transformPosting(posting)));
  }

  deletePosting(id: string) {
    return this.http.delete(`${environment.apiUrl}/postings/${id}`);
  }

  private transformPosting(posting: Posting): Posting {
    return { ...posting, datePosted: new Date(posting.datePosted) };
  }
}
