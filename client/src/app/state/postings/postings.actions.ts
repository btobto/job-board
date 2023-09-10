import { createAction, props } from '@ngrx/store';
import { Posting } from 'src/app/models';

export const loadCompanyPostings = createAction('[Company page] Load company postings', props<{ companyId: string }>());

export const loadCompanyPostingsSuccess = createAction(
  '[Postings API] Load company postings success',
  props<{ postings: Posting[] }>()
);

export const loadPosting = createAction('[Posting page] Load posting', props<{ id: string }>()); // todo

export const loadPostingSuccess = createAction('[Postings API] Load posting success', props<{ posting: Posting }>());

export const postingFailure = createAction('[Postings API] Postings failure', props<{ error: any }>());

// export const searchPostings = createAction();

export const applyToPosting = createAction(
  '[Company page / Posting page] Apply to job posting',
  props<{ postingId: string }>()
);

// export const updatePosting = createAction('[Company page] Update posting', )

export const deletePosting = createAction('[Company page] Delete posting', props<{ id: string }>());
