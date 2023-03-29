import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationResult } from '../common/models/pagination-result.interface';
import { ReviewCreateDto } from './models/review-create.dto';
import { ReviewUpdateDto } from './models/review-update.dto';
import { Review } from './models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getCompanyReviews(
    companyId: string,
    page: number = 1,
    take: number = 10
  ): Observable<PaginationResult<Review>> {
    return this.http.get<PaginationResult<Review>>(
      environment.api +
        '/reviews/' +
        companyId +
        '?page=' +
        page +
        '&take=' +
        take
    );
  }

  post(companyId: string, dto: ReviewCreateDto): Observable<Review> {
    return this.http.post<Review>(
      environment.api + '/reviews/' + companyId,
      dto
    );
  }

  update(id: string, dto: ReviewUpdateDto): Observable<Review> {
    return this.http.patch<Review>(environment.api + '/reviews/' + id, dto);
  }

  delete(id: string) {
    return this.http.delete(environment.api + '/reviews/' + id);
  }
}
