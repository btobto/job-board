import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { HttpErrorBody } from 'src/app/models';
import { getUserType } from 'src/app/shared/helpers';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(selectUserState, (state) => state.user);

export const selectError = createSelector(selectUserState, (state) => state.error?.error as HttpErrorBody);

export const selectUserType = createSelector(selectUser, (user) => (user ? getUserType(user) : null));
