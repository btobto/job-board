import { createAction, props } from '@ngrx/store';
import {
  CompanyRegister,
  PersonRegister,
  User,
  UserLogin,
} from 'src/app/models';

export const login = createAction(
  '[Login page] Login',
  props<{ payload: UserLogin }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth API] Login failure',
  props<{ error: any }>()
);

export const registerPerson = createAction(
  '[Register person page] Register',
  props<{ payload: PersonRegister }>()
);

export const registerCompany = createAction(
  '[Register company page] Register',
  props<{ payload: CompanyRegister }>()
);

export const registerSuccess = createAction(
  '[Auth API] Register success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth API] Register failure',
  props<{ error: any }>()
);

export const logoutInit = createAction('[Auth] Logout');

export const logoutConfirmed = createAction('[Auth] Logout confirmed');

export const logoutCancelled = createAction('[Auth] Logout cancelled');
