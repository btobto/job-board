import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Person } from 'src/app/models';
import { personsActions } from '.';
import { userActions } from '../user';

export interface PersonsState extends EntityState<Person> {
  selectedPersonId: string | null;
  loading: boolean;
  error: any;
}

const adapter = createEntityAdapter<Person>({ selectId: (person: Person) => person._id });

const initialState: PersonsState = adapter.getInitialState({
  selectedPersonId: null,
  loading: false,
  error: null,
});

export const personsReducer = createReducer(
  initialState,
  on(personsActions.loadPerson, (state) => ({ ...state, loading: true })),
  on(personsActions.loadPersonSuccess, (state, { person }) =>
    adapter.upsertOne(person, { ...state, loading: false, selectedPersonId: person._id })
  ),
  on(personsActions.loadPersonFailure, (state, { error }) => ({
    ...state,
    selectedPersonId: null,
    loading: false,
    error,
  })),
  on(userActions.updatePersonSuccess, (state, { user }) =>
    adapter.upsertOne(user, { ...state, loading: false, selectedPersonId: user._id })
  )
);
