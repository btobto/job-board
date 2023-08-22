import { createAction, props } from '@ngrx/store';
import { Person } from 'src/app/models';

export const loadPerson = createAction('[Person page] Load person', props<{ personId: string }>());

export const loadPersonSuccess = createAction('[Person page] Load person success', props<{ person: Person }>());

export const loadPersonFailure = createAction('[Person page] Load person failure', props<{ error: any }>());
