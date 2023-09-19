import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { paginationAdapter } from './pagination.reducer';

const { selectIds, selectTotal, selectAll, selectEntities } = paginationAdapter.getSelectors();

export const selectPaginationState = (state: AppState) => state.pagination;

export const selectPaginationIds = createSelector(selectPaginationState, selectIds);

export const selectPaginationTotal = createSelector(selectPaginationState, selectTotal);

export const selectAllPages = createSelector(selectPaginationState, selectAll);

export const selectPaginationEntities = createSelector(selectPaginationState, selectEntities);

export const selectPaginationInfo = createSelector(selectPaginationState, (state) => ({
  take: state.take,
  currentPage: state.currentPage,
  totalCount: state.totalCount,
  pageCount: state.pageCount,
}));

export const selectCurrentPage = createSelector(selectPaginationState, selectPaginationEntities, (state, entities) =>
  state.currentPage ? entities[state.currentPage]! : null
);

export const selectPages = createSelector(selectAllPages, (pages) => pages.map((page) => page.pageNumber));
