import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Person } from 'src/app/models';
import { personsActions } from '.';
import { userActions } from '../user';
import { postingsActions } from '../postings';

export interface PersonsState extends EntityState<Person> {
  selectedPersonId: string | null;
  loading: boolean;
  error: any;
}

export const personsAdapter = createEntityAdapter<Person>({ selectId: (person: Person) => person._id });

const initialState: PersonsState = personsAdapter.getInitialState({
  selectedPersonId: null,
  loading: false,
  error: null,
});

export const personsReducer = createReducer(
  initialState,
  on(personsActions.loadPerson, postingsActions.loadPostingApplicants, (state) => ({ ...state, loading: true })),
  on(personsActions.loadPersonSuccess, (state, { person }) =>
    personsAdapter.setOne(person, { ...state, loading: false, selectedPersonId: person._id })
  ),
  on(personsActions.loadPersonFailure, (state, { error }) => ({
    ...state,
    selectedPersonId: null,
    loading: false,
    error,
  })),
  on(userActions.updatePersonSuccess, (state, { user }) =>
    personsAdapter.upsertOne(user, { ...state, loading: false, selectedPersonId: user._id })
  ),
  on(postingsActions.loadPostingApplicantsSuccess, (state, { applicants }) =>
    personsAdapter.setAll(applicants, { ...state, loading: false, selectedPersonId: null })
  ),
  on(postingsActions.loadPostingApplicantsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
