import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Person } from 'src/app/models';
import { personActions } from '.';
import { userActions } from '../user';

export interface PersonState extends EntityState<Person> {
  selectedPersonId: string | null;
  loading: boolean;
  error: any;
}

const adapter = createEntityAdapter<Person>({ selectId: (person: Person) => person._id });

const initialState: PersonState = adapter.getInitialState({
  selectedPersonId: null,
  loading: false,
  error: null,
});

export const personReducer = createReducer(
  initialState,
  on(personActions.loadPerson, (state) => ({ ...state, loading: true })),
  on(personActions.loadPersonSuccess, (state, { person }) =>
    adapter.upsertOne(person, { ...state, loading: false, selectedPersonId: person._id })
  ),
  on(personActions.loadPersonFailure, (state, { error }) => ({
    ...state,
    selectedPersonId: null,
    loading: false,
    error,
  })),
  on(userActions.updatePersonSuccess, (state, { user }) =>
    adapter.upsertOne(user, { ...state, loading: false, selectedPersonId: user._id })
  )
);
