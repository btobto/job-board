import { createAction, props } from '@ngrx/store';
import { Person, UpdatePersonDto } from 'src/app/models';

export const loadPerson = createAction('[Person page] Load person', props<{ personId: string }>());

export const loadPersonSuccess = createAction('[Person API] Load person success', props<{ person: Person }>());

export const loadPersonFailure = createAction('[Person API] Load person failure', props<{ error: any }>());
