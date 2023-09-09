import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCompaniesState = (state: AppState) => state.companies;

export const selectSelectedCompany = createSelector(selectCompaniesState, (state) =>
  state.selectedCompanyId ? state.entities[state.selectedCompanyId] : null
);
