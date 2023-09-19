import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Company } from 'src/app/models';
import { companiesActions } from '.';
import { userActions } from '../user';

export interface CompaniesState extends EntityState<Company> {
  selectedCompanyId: string | null;
  loading: boolean;
  error: any;
}

export const companiesAdapter = createEntityAdapter<Company>({ selectId: (company: Company) => company._id });

const initialState: CompaniesState = companiesAdapter.getInitialState({
  selectedCompanyId: null,
  loading: false,
  error: null,
});

export const companiesReducer = createReducer(
  initialState,
  on(companiesActions.loadCompany, companiesActions.searchCompanies, (state) => ({ ...state, loading: true })),
  on(companiesActions.loadCompanySuccess, (state, { company }) =>
    companiesAdapter.upsertOne(company, { ...state, loading: false, selectedCompanyId: company._id })
  ),
  on(companiesActions.loadCompanyFailure, companiesActions.searchCompaniesFailure, (state, { error }) => ({
    ...state,
    selectedCompanyId: null,
    loading: false,
    error,
  })),
  on(userActions.updateCompanySuccess, (state, { user }) =>
    companiesAdapter.upsertOne(user, { ...state, loading: false, selectedCompanyId: user._id })
  ),
  on(companiesActions.updateRating, (state, { changes }) => companiesAdapter.updateOne(changes, state)),
  on(companiesActions.searchCompaniesSuccess, (state, { companies }) =>
    companiesAdapter.setAll(companies, { ...state, loading: false, selectedCompanyId: null })
  ),
  on(companiesActions.resetState, () => ({ ...initialState }))
);
