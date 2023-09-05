import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { HttpErrorBody, User } from 'src/app/models';

export const selectAuth = (state: AppState) => state.auth;

export const selectError = createSelector(selectAuth, (state) => state.error?.error as HttpErrorBody);

export const selectLoading = createSelector(selectAuth, (state) => state.loading);

export const selectIsLoggedIn = createSelector(selectAuth, (state) => !!state.token);
