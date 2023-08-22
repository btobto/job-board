import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { personActions } from '.';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { HttpErrorBody, Person } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class PersonEffects {
  loadPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personActions.loadPerson),
      switchMap(({ personId }) =>
        this.personSerice.getPerson(personId).pipe(
          map((person: Person) => personActions.loadPersonSuccess({ person })),
          catchError((error) => of(personActions.loadPersonFailure({ error: error.error })))
        )
      )
    )
  );

  loadPersonFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(personActions.loadPersonFailure),
        tap(({ error }: { error: HttpErrorBody }) => this.notificationService.showError(error.error, error.message))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private personSerice: PersonService,
    private notificationService: NotificationService
  ) {}
}
