import { createAction, props } from '@ngrx/store';
import { PaginationQuery, Review } from 'src/app/models';
import { PaginationResult } from 'src/app/models/pagination-result.model';
import { ReviewDto } from 'src/app/models/review-dto.model';

export const loadCompanyReviews = createAction(
  '[Company page] Load company reviews',
  props<{ companyId: string; query: PaginationQuery }>()
);

export const loadCompanyReviewsSuccess = createAction(
  '[Company page] Load company reviews success',
  props<{ result: PaginationResult<Review> }>()
);

export const loadPersonReview = createAction('[Company page] Load person review', props<{ companyId: string }>());

export const loadPersonReviewSuccess = createAction(
  '[Reviews API] Load person review success',
  props<{ review: Review | null }>()
);

export const reviewFailure = createAction('[Reviews API] Reviews failure', props<{ error: any }>());

export const createReview = createAction(
  '[Company page] Create review',
  props<{ companyId: string; dto: ReviewDto }>()
);

export const createReviewSuccess = createAction('[Reviews API] Create review success', props<{ review: Review }>());

export const updateReview = createAction('[Company page] Update review', props<{ reviewId: string; dto: ReviewDto }>());

export const updateReviewSuccess = createAction('[Reviews API] Update review success', props<{ review: Review }>());

export const deleteReview = createAction('[Company page] Delete review', props<{ id: string }>());

export const deleteReviewSuccess = createAction('[Reviews API] Delete review success');

export const deleteReviewSuccessRefresh = createAction(
  '[Reviews API] Delete review success with refresh',
  props<{ companyId: string; query: PaginationQuery }>()
);
