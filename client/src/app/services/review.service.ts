import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDto } from '../models/review-dto.model';
import { Observable } from 'rxjs';
import { Review } from '../models';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/pagination-result.model';
import { PaginationQuery } from '../models/pagination-query.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getCompanyReviews(id: string, query: PaginationQuery = { page: 1, take: 10 }): Observable<PaginationResult<Review>> {
    return this.http.get<PaginationResult<Review>>(`${environment.apiUrl}/reviews/${id}`, {
      params: new HttpParams({ fromObject: query }),
    });
  }

  getUserReviewForCompany(companyId: string): Observable<Review> {
    return this.http.get<Review>(`${environment.apiUrl}/reviews/${companyId}/person`);
  }

  postReview(companyId: string, dto: ReviewDto): Observable<Review> {
    return this.http.post<Review>(`${environment.apiUrl}/reviews/${companyId}`, dto);
  }

  updateReview(id: string, dto: ReviewDto): Observable<Review> {
    return this.http.patch<Review>(`${environment.apiUrl}/reviews/${id}`, dto);
  }

  deleteReview(id: string) {
    return this.http.delete(`${environment.apiUrl}/reviews/${id}`);
  }
}
