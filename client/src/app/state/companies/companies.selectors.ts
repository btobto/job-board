import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { companiesAdapter } from './companies.reducer';

const { selectIds, selectTotal, selectAll, selectEntities } = companiesAdapter.getSelectors();

export const selectCompaniesState = (state: AppState) => state.companies;

export const selectCompaniesIds = createSelector(selectCompaniesState, selectIds);

export const selectCompaniesTotal = createSelector(selectCompaniesState, selectTotal);

export const selectAllCompanies = createSelector(selectCompaniesState, selectAll);

export const selectCompaniesEntities = createSelector(selectCompaniesState, selectEntities);

export const selectSelectedCompany = createSelector(selectCompaniesState, selectCompaniesEntities, (state, entities) =>
  state.selectedCompanyId ? entities[state.selectedCompanyId]! : null
);
