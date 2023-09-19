import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDto } from '../models/review/review-dto.model';
import { Observable } from 'rxjs';
import { Review } from '../models';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../models/pagination/pagination-result.model';
import { PaginationQuery } from '../models/pagination/pagination-query.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private apiService: ApiService) {}

  getCompanyReviews(id: string, query: PaginationQuery = { page: 1, take: 10 }): Observable<PaginationResult<Review>> {
    return this.apiService.get<PaginationResult<Review>>(`/reviews/${id}`, {
      params: new HttpParams({ fromObject: query }),
    });
  }

  getUserReviewForCompany(companyId: string): Observable<Review> {
    return this.apiService.get<Review>(`/reviews/${companyId}/person`);
  }

  postReview(companyId: string, dto: ReviewDto): Observable<Review> {
    return this.apiService.post<Review, ReviewDto>(`/reviews/${companyId}`, dto);
  }

  updateReview(id: string, dto: ReviewDto): Observable<Review> {
    return this.apiService.patch<Review, ReviewDto>(`/reviews/${id}`, dto);
  }

  deleteReview(id: string) {
    return this.apiService.delete(`/reviews/${id}`);
  }
}
