import { createSelector } from '@ngrx/store';
import { fromUser } from './user';
import { AppState } from './app.state';
import { fromPersons } from './persons';
import { combineLatest } from 'rxjs';
import { fromCompanies } from './companies';

export const selectUserAndPerson = createSelector(
  fromUser.selectUser,
  fromPersons.selectSelectedPerson,
  (loggedInUser, person) => (!!loggedInUser && !!person ? { loggedInUser, person } : null)
);

export const selectUserAndCompany = createSelector(
  fromUser.selectUser,
  fromCompanies.selectSelectedCompany,
  (loggedInUser, company) => (!!loggedInUser && !!company ? { loggedInUser, company } : null)
);
