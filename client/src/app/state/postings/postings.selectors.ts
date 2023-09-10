import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { postingsAdapter } from './postings.reducer';

const { selectIds, selectAll, selectTotal } = postingsAdapter.getSelectors();

export const selectPostingsState = (state: AppState) => state.postings;

export const selectPostingsIds = createSelector(selectPostingsState, selectIds);

export const selectAllPostings = createSelector(selectPostingsState, selectAll);

export const selectPostingsTotal = createSelector(selectPostingsState, selectTotal);
