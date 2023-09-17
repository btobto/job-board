import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pagination, Review } from 'src/app/models';
import * as reviewsActions from './reviews.actions';
import { REVIEW_TAKE_LIMIT } from 'src/app/shared/constants';

const createReview = (state: ReviewsState, review: Review): ReviewsState => {
  const shouldAdd: boolean =
    state.pagination.page === state.pagination.pageCount && state.ids.length < state.pagination.take;

  const newState: ReviewsState = {
    ...state,
    loading: false,
    userReview: review,
    pagination: {
      ...state.pagination,
      totalCount: state.pagination.totalCount + 1,
      pageCount: Math.ceil((state.pagination.totalCount + 1) / state.pagination.take),
    },
  };
  if (shouldAdd) {
    return reviewsAdapter.upsertOne(review, newState);
  } else {
    return newState;
  }
};

const updateReview = (state: ReviewsState, review: Review): ReviewsState => {
  const newState: ReviewsState = {
    ...state,
    loading: false,
    userReview: review,
  };

  if ((state.ids as string[]).includes(review._id)) {
    return reviewsAdapter.upsertOne(review, newState);
  } else {
    return newState;
  }
};

const upsertReview = (state: ReviewsState, review: Review, condition: boolean): ReviewsState => {
  const newState: ReviewsState = { ...state, loading: false, userReview: review };
  if (condition) {
    return reviewsAdapter.upsertOne(review, newState);
  } else {
    return newState;
  }
};

export interface ReviewsState extends EntityState<Review> {
  userReview: Review | null;
  pagination: Pagination;
  loading: boolean;
  error: any;
}

export const reviewsAdapter = createEntityAdapter<Review>({
  selectId: (review: Review) => review._id,
  sortComparer: false,
});

const initialState: ReviewsState = reviewsAdapter.getInitialState({
  userReview: null,
  pagination: {
    page: 1,
    take: REVIEW_TAKE_LIMIT,
    pageCount: 0,
    totalCount: 0,
  },
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
    reviewsAdapter.setAll(result.data, {
      ...state,
      loading: false,
      pagination: {
        page: result.page,
        take: result.take,
        pageCount: result.pageCount,
        totalCount: result.totalCount,
      },
    })
  ),
  on(reviewsActions.loadPersonReviewSuccess, (state, { review }) => ({ ...state, loading: false, userReview: review })),
  on(reviewsActions.createReviewSuccess, (state, { review }) => createReview(state, review)),
  on(reviewsActions.updateReviewSuccess, (state, { review }) => updateReview(state, review)),
  on(reviewsActions.deleteReviewSuccess, reviewsActions.deleteReviewSuccessRefresh, (state) => ({
    ...state,
    loading: false,
    userReview: null,
  })),
  on(reviewsActions.reviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
