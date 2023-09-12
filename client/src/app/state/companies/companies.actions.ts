import { createAction, props } from '@ngrx/store';
import { Company, CompanyUpdateDto } from 'src/app/models';

export const loadCompany = createAction('[Company page] Load company', props<{ companyId: string }>());

export const loadCompanySuccess = createAction('[Company API] Load company success', props<{ company: Company }>());

export const loadCompanyFailure = createAction('[Company API] Load company faiulre', props<{ error: any }>());
