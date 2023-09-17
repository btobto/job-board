import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { reviewsAdapter } from './reviews.reducer';

const { selectAll, selectEntities, selectTotal } = reviewsAdapter.getSelectors();

export const selectReviewsState = (state: AppState) => state.reviews;

export const selectReviewsIds = createSelector(selectReviewsState, (state) => state.ids as string[]);

export const selectAllReviews = createSelector(selectReviewsState, selectAll);

export const selectReviewsEntities = createSelector(selectReviewsState, selectEntities);

export const selectReviewsTotal = createSelector(selectReviewsState, selectTotal);

export const selectPaginationInfo = createSelector(selectReviewsState, (state) => state.pagination);

export const selectUserReview = createSelector(selectReviewsState, (state) => state.userReview);

export const selectReviewsWithPagination = createSelector(
  selectAllReviews,
  selectPaginationInfo,
  (reviews, pagination) => ({
    reviews,
    pagination,
  })
);
