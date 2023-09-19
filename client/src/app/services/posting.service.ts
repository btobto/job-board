import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Person, Posting, PostingDto, PostingSearchQuery } from '../models';
import { environment } from 'src/environments/environment';
import { excludeFromPostingInterceptor } from '../interceptors';
import { PostingPopulated } from '../models/posting/posting-populated.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private apiService: ApiService) {}

  getCompanyPostings(companyId: string): Observable<Posting[]> {
    return this.apiService.get<Posting[]>(`/postings/company/${companyId}`);
  }

  getPosting(id: string): Observable<Posting> {
    return this.apiService.get<Posting>(`/postings/${id}`);
  }

  createPosting(payload: PostingDto): Observable<Posting> {
    return this.apiService.post<Posting, PostingDto>(`/postings`, payload);
  }

  updatePosting(postingId: string, payload: PostingDto): Observable<Posting> {
    return this.apiService.patch<Posting, PostingDto>(`/postings/${postingId}`, payload);
  }

  toggleApply(postingId: string): Observable<Posting> {
    return this.apiService.patch<Posting, null>(`/postings/${postingId}/application`, null);
  }

  deletePosting(id: string) {
    return this.apiService.delete(`/postings/${id}`);
  }

  getApplicants(id: string): Observable<Person[]> {
    return this.apiService.get<Person[]>(`/postings/${id}/applicants`, {
      context: excludeFromPostingInterceptor(),
    });
  }

  search(query: PostingSearchQuery): Observable<PostingPopulated[]> {
    return this.apiService.post<PostingPopulated[], PostingSearchQuery>(`/postings/search`, query);
  }
}
