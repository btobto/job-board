import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectPersonState = (state: AppState) => state.person;

export const selectSelectedPerson = createSelector(selectPersonState, (state) =>
  state.selectedPersonId ? state.entities[state.selectedPersonId]! : null
);
