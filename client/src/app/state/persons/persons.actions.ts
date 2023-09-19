import { createAction, props } from '@ngrx/store';
import { Person, PersonSearchQuery } from 'src/app/models';

export const loadPerson = createAction('[Person page] Load person', props<{ personId: string }>());

export const loadPersonSuccess = createAction('[Person API] Load person success', props<{ person: Person }>());

export const loadPersonFailure = createAction('[Person API] Load person failure', props<{ error: any }>());

export const searchPeople = createAction('[Search page] Search people', props<{ query: PersonSearchQuery }>());

export const searchPeopleSuccess = createAction('[Person API] Search people success', props<{ people: Person[] }>());

export const searchPeopleFailure = createAction('[Search page] Search people failure', props<{ error: any }>());

export const resetState = createAction('[Search page] Clear people');
