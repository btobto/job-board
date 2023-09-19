import { createAction, props } from '@ngrx/store';
import { Person, Posting, PostingDto, PostingSearchQuery } from 'src/app/models';
import { PostingPopulated } from 'src/app/models/posting/posting-populated.model';

export const loadCompanyPostings = createAction('[Company page] Load company postings', props<{ companyId: string }>());

export const loadCompanyPostingsSuccess = createAction(
  '[Postings API] Load company postings success',
  props<{ postings: Posting[] }>()
);

export const loadPosting = createAction('[Posting page] Load posting', props<{ id: string }>());

export const loadPostingSuccess = createAction('[Postings API] Load posting success', props<{ posting: Posting }>());

export const postingFailure = createAction('[Postings API] Postings failure', props<{ error: any }>());

export const createPosting = createAction('[Company page] Create posting', props<{ dto: PostingDto }>());

export const createPostingSuccess = createAction('[Posting API] Create posting success', props<{ posting: Posting }>());

export const updatePosting = createAction(
  '[Company page] Update posting',
  props<{ postingId: string; dto: PostingDto }>()
);

export const updatePostingSuccess = createAction('[Posting API] Update posting success', props<{ posting: Posting }>());

export const toggleApplyPosting = createAction('[Company page] Toggle apply posting', props<{ postingId: string }>());

export const toggleApplyPostingSuccess = createAction(
  '[Company page] Toggle apply posting success',
  props<{ posting: Posting }>()
);

export const loadPostingApplicants = createAction(
  '[Company page] Load posting applicants',
  props<{ postingId: string }>()
);

export const loadPostingApplicantsSuccess = createAction(
  '[Posting API] Load applicants success',
  props<{ applicants: Person[] }>()
);

export const loadPostingApplicantsFailure = createAction(
  '[Posting API] Load applicants failure',
  props<{ error: any }>()
);

export const deletePosting = createAction('[Company page] Delete posting', props<{ id: string }>());

export const deletePostingSuccess = createAction('[Posting API] Delete posting success', props<{ id: string }>());

export const searchPostings = createAction('[Search page] Search postings', props<{ query: PostingSearchQuery }>());

export const searchPostingsSuccess = createAction(
  '[Posting API] Search postings success',
  props<{ postings: PostingPopulated[] }>()
);

export const searchPostingsFailure = createAction('[Search page] Search postings failure', props<{ error: any }>());

export const resetState = createAction('[Search page] Clear postings');

export const getRecommendedPostings = createAction('[Home page] Get recommended postings');

export const getRecommendedPostingsSuccess = createAction(
  '[Postings API] Get recommended postings success',
  props<{ postings: PostingPopulated[] }>()
);
