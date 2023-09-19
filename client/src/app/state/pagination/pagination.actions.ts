import { createAction, props } from '@ngrx/store';

export const changeCurrentPage = createAction('[Entities page] Change current page', props<{ newPage: number }>());
