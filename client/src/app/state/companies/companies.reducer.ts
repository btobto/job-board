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

const adapter = createEntityAdapter<Company>({ selectId: (company: Company) => company._id });

const initialState: CompaniesState = adapter.getInitialState({
  selectedCompanyId: null,
  loading: false,
  error: null,
});

export const companiesReducer = createReducer(
  initialState,
  on(companiesActions.loadCompany, (state) => ({ ...state, loading: true })),
  on(companiesActions.loadCompanySuccess, (state, { company }) =>
    adapter.upsertOne(company, { ...state, loading: false, selectedCompanyId: company._id })
  ),
  on(companiesActions.loadCompanyFailure, (state, { error }) => ({
    ...state,
    selectedCompanyId: null,
    loading: false,
    error,
  })),
  on(userActions.updateCompanySuccess, (state, { user }) =>
    adapter.upsertOne(user, { ...state, loading: false, selectedCompanyId: user._id })
  )
);
