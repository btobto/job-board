import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Company, CompanySearchQuery, CompanyUpdateDto } from 'src/app/models';

export const loadCompany = createAction('[Company page] Load company', props<{ companyId: string }>());

export const loadCompanySuccess = createAction('[Company API] Load company success', props<{ company: Company }>());

export const loadCompanyFailure = createAction('[Company API] Load company faiulre', props<{ error: any }>());

export const updateRating = createAction('[Company API] Company rating update', props<{ changes: Update<Company> }>());

export const searchCompanies = createAction('[Search page] Search companies', props<{ query: CompanySearchQuery }>());

export const searchCompaniesSuccess = createAction(
  '[Company API] Search companies success',
  props<{ companies: Company[] }>()
);

export const searchCompaniesFailure = createAction('[Search page] Search companies failure', props<{ error: any }>());

export const resetState = createAction('[Search page] Clear companies');

export const getHighestRatedCompanies = createAction('[Home page] Get highest rated companies');

export const getHighestRatedCompaniesSuccess = createAction(
  '[Companies API] Get highest rated companies success',
  props<{ companies: Company[] }>()
);

export const getHighestRatedCompaniesFailure = createAction(
  '[Companies API] Get highest rated companies failure',
  props<{ error: any }>()
);
