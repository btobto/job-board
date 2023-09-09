import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from '.';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification.service';
import { CompanyService } from 'src/app/services/company.service';
import { authActions } from '../auth';

@Injectable()
export class UserEffects {
  updatePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updatePerson),
      concatMap(({ id, payload }) =>
        this.personService.updatePerson(id, payload).pipe(
          map((user) => userActions.updatePersonSuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error })))
        )
      )
    )
  );

  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateCompany),
      concatMap(({ id, payload }) =>
        this.companyService.updateCompany(id, payload).pipe(
          map((user) => userActions.updateCompanySuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error })))
        )
      )
    )
  );

  uploadPersonImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.uploadPersonImage),
      concatMap(({ personId, formData }) =>
        this.personService.uploadImage(personId, formData).pipe(
          map((user) => userActions.updatePersonSuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error })))
        )
      )
    )
  );

  uploadCompanyImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.uploadCompanyImage),
      concatMap(({ companyId, formData }) =>
        this.companyService.uploadImage(companyId, formData).pipe(
          map((user) => userActions.updateCompanySuccess({ user })),
          catchError((error) => of(userActions.updateUserFailure({ error })))
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updatePersonSuccess, userActions.updateCompanySuccess),
        tap(() => {
          this.notificationService.showMessage('success', 'Update user success', 'User successfully updated.');
        })
      ),
    { dispatch: false }
  );

  userFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updateUserFailure, userActions.deleteUserFailure),
        map((error) => error.error),
        tap((error) => {
          this.notificationService.showMessage('error', 'An error occurred', error.error);
        })
      ),
    { dispatch: false }
  );

  deletePerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deletePerson),
      mergeMap(({ id }) =>
        this.personService.deletePerson(id).pipe(
          map(() => authActions.logout()),
          catchError(({ error }) => of(userActions.deleteUserFailure(error)))
        )
      )
    )
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.deleteCompany),
      mergeMap(({ id }) =>
        this.companyService.deleteCompany(id).pipe(
          map(() => authActions.logout()),
          catchError(({ error }) => of(userActions.deleteUserFailure(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private companyService: CompanyService,
    private notificationService: NotificationService
  ) {}
}
