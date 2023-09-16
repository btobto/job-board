import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { personsAdapter } from './persons.reducer';

const { selectIds, selectTotal, selectAll, selectEntities } = personsAdapter.getSelectors();

export const selectPersonsState = (state: AppState) => state.persons;

export const selectPersonsIds = createSelector(selectPersonsState, selectIds);

export const selectPersonsTotal = createSelector(selectPersonsState, selectTotal);

export const selectAllPersons = createSelector(selectPersonsState, selectAll);

export const selectPersonsEntities = createSelector(selectPersonsState, selectEntities);

export const selectSelectedPerson = createSelector(selectPersonsState, selectPersonsEntities, (state, entities) =>
  state.selectedPersonId ? entities[state.selectedPersonId]! : null
);
