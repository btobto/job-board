import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Posting } from 'src/app/models';
import { postingsActions } from '.';

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
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(postingsActions.loadCompanyPostingsSuccess, (state, { postings }) =>
    postingsAdapter.setAll(postings, { ...state, loading: false })
  ),
  on(postingsActions.loadPostingSuccess, postingsActions.createPostingSuccess, (state, { posting }) =>
    postingsAdapter.addOne(posting, { ...state, loading: false })
  ),
  on(postingsActions.updatePostingSuccess, (state, { posting }) =>
    postingsAdapter.upsertOne(posting, { ...state, loading: false })
  ),
  on(postingsActions.deletePostingSuccess, (state, { id }) =>
    postingsAdapter.removeOne(id, { ...state, loading: false })
  ),
  on(postingsActions.postingFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
