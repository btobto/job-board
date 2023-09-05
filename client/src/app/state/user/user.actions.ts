import { createAction, props } from '@ngrx/store';
import { Company, Person, UpdateCompanyDto, UpdatePersonDto, User } from 'src/app/models';

export const updatePerson = createAction(
  '[Person page] Update person',
  props<{ id: string; payload: UpdatePersonDto }>()
);

export const updateCompany = createAction(
  '[Company page] Update company',
  props<{ id: string; payload: UpdateCompanyDto }>()
);

export const updatePersonSuccess = createAction('[Person API] Update person success', props<{ user: Person }>());

export const updateCompanySuccess = createAction('[Person API] Update company success', props<{ user: Company }>());

export const updateUserFailure = createAction('[Person API] Update user failure', props<{ error: any }>());
