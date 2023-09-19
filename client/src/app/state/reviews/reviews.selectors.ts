import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { reviewsAdapter } from './reviews.reducer';
import { fromPagination } from '../pagination';

const { selectAll, selectEntities, selectTotal } = reviewsAdapter.getSelectors();

export const selectReviewsState = (state: AppState) => state.reviews;

export const selectReviewsIds = createSelector(selectReviewsState, (state) => state.ids as string[]);

export const selectAllReviews = createSelector(selectReviewsState, selectAll);

export const selectReviewsEntities = createSelector(selectReviewsState, selectEntities);

export const selectReviewsTotal = createSelector(selectReviewsState, selectTotal);

export const selectUserReview = createSelector(selectReviewsState, (state) => state.userReview);

export const selectCurrentPageReviews = createSelector(
  selectReviewsEntities,
  fromPagination.selectCurrentPage,
  (entities, page) => (page ? page.ids.map((id) => entities[id]!) : [])
);

export const selectReviewsWithPagination = createSelector(
  selectCurrentPageReviews,
  fromPagination.selectPaginationInfo,
  (reviews, pagination) => ({ reviews, pagination })
);
