import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { personsActions } from './';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { HttpErrorBody, Person } from 'src/app/models';
import { NotificationService } from 'src/app/services/notification.service';
import { postingsActions } from '../postings';

@Injectable()
export class PersonsEffects {
  loadPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.loadPerson),
      switchMap(({ personId }) =>
        this.personSerice.getPerson(personId).pipe(
          map((person: Person) => personsActions.loadPersonSuccess({ person })),
          catchError((error) => of(personsActions.loadPersonFailure({ error: error.error })))
        )
      )
    )
  );

  loadPersonFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(personsActions.loadPersonFailure),
        tap(({ error }: { error: HttpErrorBody }) =>
          this.notificationService.showMessage('error', error.error, error.message)
        )
      ),
    { dispatch: false }
  );

  searchPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personsActions.searchPeople),
      switchMap(({ query }) =>
        this.personSerice.search(query).pipe(
          tap(console.log),
          map((people) => personsActions.searchPeopleSuccess({ people })),
          catchError((error) => of(personsActions.searchPeopleFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private personSerice: PersonService,
    private notificationService: NotificationService
  ) {}
}
