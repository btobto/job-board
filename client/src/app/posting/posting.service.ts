import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostingCreateDto } from './models/posting-create.dto';
import { PostingSearchQueryDto } from './models/posting-search-query.dto';
import { PostingUpdateDto } from './models/posting-update.dto';
import { Posting } from './models/posting.interface';

@Injectable({
  providedIn: 'root',
})
export class PostingService {
  constructor(private http: HttpClient) {}

  search(dto: PostingSearchQueryDto): Observable<Posting[]> {
    return this.http.post<Posting[]>(environment.api + '/postings/search', dto);
  }

  getCompanyPostings(companyId: string): Observable<Posting[]> {
    return this.http.get<Posting[]>(
      environment.api + '/postings/company/' + companyId
    );
  }

  get(id: string): Observable<Posting> {
    return this.http.get<Posting>(environment.api + '/postings/' + id);
  }

  post(dto: PostingCreateDto): Observable<Posting> {
    return this.http.post<Posting>(environment.api + '/postings', dto);
  }

  apply(id: string): Observable<Posting> {
    return this.http.patch<Posting>(
      environment.api + '/postings/application' + id,
      {}
    );
  }

  update(id: string, dto: PostingUpdateDto): Observable<Posting> {
    return this.http.patch<Posting>(environment.api + '/postings/' + id, dto);
  }

  delete(id: string) {
    return this.http.delete(environment.api + '/postings/' + id);
  }
}
