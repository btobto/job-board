import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import { authActions } from '../auth';
import { userActions } from '.';

export interface UserState {
  user: User | null;
  error: any;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, authActions.registerSuccess, authActions.autoLoginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(userActions.updatePersonSuccess, userActions.updateCompanySuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(userActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(userActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(authActions.logout, () => ({ ...initialState }))
);
