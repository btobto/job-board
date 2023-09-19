import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Review } from 'src/app/models';
import * as reviewsActions from './reviews.actions';

const updateReview = (state: ReviewsState, review: Review): ReviewsState => {
  const newState = { ...state, loading: false, userReview: review };
  if ((state.ids as string[]).includes(review._id)) {
    return reviewsAdapter.upsertOne(review, newState);
  } else {
    return newState;
  }
};

export interface ReviewsState extends EntityState<Review> {
  userReview: Review | null;
  loading: boolean;
  error: any;
}

export const reviewsAdapter = createEntityAdapter<Review>({
  selectId: (review: Review) => review._id,
  sortComparer: false,
});

const initialState: ReviewsState = reviewsAdapter.getInitialState({
  userReview: null,
  loading: false,
  error: null,
});

export const reviewsReducer = createReducer(
  initialState,
  on(
    reviewsActions.loadCompanyReviews,
    reviewsActions.loadPersonReview,
    reviewsActions.createReview,
    reviewsActions.updateReview,
    reviewsActions.deleteReview,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(reviewsActions.loadCompanyReviewsSuccess, (state, { result }) =>
    reviewsAdapter.addMany(result.data, {
      ...state,
      loading: false,
    })
  ),
  on(reviewsActions.loadPersonReviewSuccess, reviewsActions.createReviewSuccess, (state, { review }) => ({
    ...state,
    loading: false,
    userReview: review,
  })),
  on(reviewsActions.updateReviewSuccess, (state, { review }) => updateReview(state, review)),
  on(reviewsActions.deleteReviewSuccess, (state) => ({ ...state, loading: false, userReview: null })),
  on(reviewsActions.refreshPage, reviewsActions.clearReviews, (state) => reviewsAdapter.removeAll(state)),
  on(reviewsActions.reviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
