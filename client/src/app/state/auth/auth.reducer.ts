import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import { authActions } from '.';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    authActions.login,
    authActions.autoLogin,
    authActions.registerPerson,
    authActions.registerCompany,
    (state) => ({
      ...state,
      loading: true,
    })
  ),
  on(
    authActions.loginSuccess,
    authActions.registerSuccess,
    (state, { user }) => ({
      user,
      loading: false,
      error: null,
    })
  ),
  on(
    authActions.loginFailure,
    authActions.registerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(authActions.logout, (state) => initialState)
);
