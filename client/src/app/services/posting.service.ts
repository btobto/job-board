import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Posting } from '../models';
import { environment } from 'src/environments/environment';

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
}
