import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import { authActions } from '.';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, authActions.registerPerson, authActions.registerCompany, (state) => ({
    ...state,
    loading: true,
  })),
  on(authActions.autoLogin, (state, { token }) => ({
    ...state,
    loading: true,
    token,
  })),
  on(authActions.loginSuccess, authActions.registerSuccess, authActions.autoLoginSuccess, (state, { user }) => ({
    ...state,
    token: user.accessToken,
    loading: false,
  })),
  on(authActions.loginFailure, authActions.registerFailure, (state, { error }) => ({
    token: null,
    loading: false,
    error,
  })),
  on(authActions.logout, authActions.autoLoginFaliure, (_) => initialState)
);
