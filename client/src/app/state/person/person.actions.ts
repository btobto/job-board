import { createAction, props } from '@ngrx/store';
import { Person, UpdatePersonDto } from 'src/app/models';

export const loadPerson = createAction('[Person page] Load person', props<{ personId: string }>());

export const loadPersonSuccess = createAction('[Person API] Load person success', props<{ person: Person }>());

export const loadPersonFailure = createAction('[Person API] Load person failure', props<{ error: any }>());

export const updatePerson = createAction(
  '[Person page] Update person',
  props<{ id: string; payload: UpdatePersonDto }>()
);

export const updatePersonSuccess = createAction('[Person API] Update person success', props<{ person: Person }>());

export const updatePersonFailure = createAction('[Person API] Update person failure', props<{ error: any }>());
