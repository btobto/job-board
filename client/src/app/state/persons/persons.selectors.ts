import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectPersonsState = (state: AppState) => state.persons;

export const selectSelectedPerson = createSelector(selectPersonsState, (state) =>
  state.selectedPersonId ? state.entities[state.selectedPersonId]! : null
);
