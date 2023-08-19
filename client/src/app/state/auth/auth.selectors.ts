import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { HttpErrorBody, User } from 'src/app/models';

export const selectAuth = (state: AppState) => state.auth;

export const selectUser = createSelector(selectAuth, (state) => state.user);

export const selectError = createSelector(selectAuth, (state) => state.error?.error as HttpErrorBody);

export const selectLoading = createSelector(selectAuth, (state) => state.loading);
