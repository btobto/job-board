import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Page } from 'src/app/models';
import { REVIEW_TAKE_LIMIT } from 'src/app/shared/constants';
import { reviewsActions } from '../reviews';
import { paginationActions } from '.';

export interface PaginationState extends EntityState<Page> {
  take: number;
  currentPage: number;
  totalCount: number;
  pageCount: number;
}

export const paginationAdapter = createEntityAdapter<Page>({ selectId: (page: Page) => page.pageNumber });

const initialState: PaginationState = paginationAdapter.getInitialState({
  take: REVIEW_TAKE_LIMIT,
  currentPage: 0,
  totalCount: 0,
  pageCount: 0,
});

export const paginationReducer = createReducer(
  initialState,
  on(reviewsActions.loadCompanyReviewsSuccess, (state, { result }) =>
    paginationAdapter.addOne(
      { ids: result.data.map((r) => r._id), pageNumber: result.page },
      {
        ...state,
        take: result.take,
        currentPage: result.page,
        totalCount: result.totalCount,
        pageCount: result.pageCount,
      }
    )
  ),
  on(paginationActions.changeCurrentPage, (state, { newPage }) => ({ ...state, currentPage: newPage })),
  on(reviewsActions.refreshPage, () => ({ ...initialState }))
);
