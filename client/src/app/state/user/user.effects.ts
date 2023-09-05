import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from '.';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification.service';

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

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.updateUserFailure),
        map((error) => error.error),
        tap((error) => {
          this.notificationService.showError('Update error', error.error);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private notificationService: NotificationService
  ) {}
}
