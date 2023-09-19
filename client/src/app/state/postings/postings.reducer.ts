import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Posting } from 'src/app/models';
import { postingsActions } from './';

export interface PostingsState extends EntityState<Posting> {
  selectedPostingId: string | null;
  loading: boolean;
  error: any;
}

export const postingsAdapter = createEntityAdapter<Posting>({
  selectId: (posting: Posting) => posting._id,
  sortComparer: (a: Posting, b: Posting): number => b.datePosted.valueOf() - a.datePosted.valueOf(),
});

const initialState: PostingsState = postingsAdapter.getInitialState({
  selectedPostingId: null,
  loading: false,
  error: null,
});

export const postingsReducer = createReducer(
  initialState,
  on(
    postingsActions.loadCompanyPostings,
    postingsActions.loadPosting,
    postingsActions.createPosting,
    postingsActions.updatePosting,
    postingsActions.deletePosting,
    postingsActions.toggleApplyPosting,
    postingsActions.searchPostings,
    postingsActions.getRecommendedPostings,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(
    postingsActions.loadCompanyPostingsSuccess,
    postingsActions.searchPostingsSuccess,
    postingsActions.getRecommendedPostingsSuccess,
    (state, { postings }) => postingsAdapter.setAll(postings, { ...state, loading: false })
  ),
  on(postingsActions.loadPostingSuccess, postingsActions.createPostingSuccess, (state, { posting }) =>
    postingsAdapter.addOne(posting, { ...state, loading: false })
  ),
  on(postingsActions.updatePostingSuccess, postingsActions.toggleApplyPostingSuccess, (state, { posting }) =>
    postingsAdapter.upsertOne(posting, { ...state, loading: false })
  ),
  on(postingsActions.deletePostingSuccess, (state, { id }) =>
    postingsAdapter.removeOne(id, { ...state, loading: false })
  ),
  on(postingsActions.postingFailure, postingsActions.searchPostingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(postingsActions.resetState, () => ({ ...initialState }))
);
