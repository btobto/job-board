import { createAction, props } from '@ngrx/store';
import { CompanyRegister, PersonRegister, User, UserLogin } from 'src/app/models';

export const login = createAction('[Login page] Login', props<{ payload: UserLogin; isCompany: boolean }>());

export const loginSuccess = createAction('[Auth API] Login success', props<{ user: User }>());

export const loginFailure = createAction('[Auth API] Login failure', props<{ error: any }>());

export const registerPerson = createAction('[Register person page] Register', props<{ payload: PersonRegister }>());

export const registerCompany = createAction('[Register company page] Register', props<{ payload: CompanyRegister }>());

export const registerSuccess = createAction('[Auth API] Register success', props<{ user: User }>());

export const registerFailure = createAction('[Auth API] Register failure', props<{ error: any }>());

export const autoLogin = createAction('[Auth] Auto login', props<{ token: string }>());

export const autoLoginSuccess = createAction('[Auth] Auto login success', props<{ user: User }>());

export const autoLoginFaliure = createAction('[Auth] Auto login failure');

export const logout = createAction('[Auth] Logout');
