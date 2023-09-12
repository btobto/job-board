import { createAction, props } from '@ngrx/store';
import { Company, Person, CompanyUpdateDto, PersonUpdateDto, User } from 'src/app/models';

export const updatePerson = createAction(
  '[Person page] Update person',
  props<{ id: string; payload: PersonUpdateDto }>()
);

export const updateCompany = createAction(
  '[Company page] Update company',
  props<{ id: string; payload: CompanyUpdateDto }>()
);

export const uploadPersonImage = createAction(
  '[Person page] Upload image',
  props<{ personId: string; formData: FormData }>()
);

export const uploadCompanyImage = createAction(
  '[Company page] Upload image',
  props<{ companyId: string; formData: FormData }>()
);

export const updatePersonSuccess = createAction('[Person API] Update person success', props<{ user: Person }>());

export const updateCompanySuccess = createAction('[Person API] Update company success', props<{ user: Company }>());

export const updateUserFailure = createAction('[Person API] Update user failure', props<{ error: any }>());

export const deletePerson = createAction('[Person page] Delete person', props<{ id: string }>());

export const deleteCompany = createAction('[Person page] Delete company', props<{ id: string }>());

export const deleteUserFailure = createAction('[Person/Company API] Delete user failure', props<{ error: any }>());
