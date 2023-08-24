import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { authActions } from '.';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Company, HttpErrorBody, Person, User } from 'src/app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      // delay(2000),
      exhaustMap(({ payload, isCompany }) =>
        this.authService.login(payload, isCompany).pipe(
          map((user: User) => authActions.loginSuccess({ user })),
          catchError((error) => of(authActions.loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerPerson, authActions.registerCompany),
      exhaustMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((user: User) => authActions.registerSuccess({ user })),
          catchError((error) => of(authActions.registerFailure({ error })))
        )
      )
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      map(() => this.authService.getUserFromLocalStorage()),
      map((user) => (user ? authActions.autoLoginSuccess({ user }) : authActions.autoLoginFaliure()))
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.authService.removeUserFromLocalStorage();
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap(({ user }) => {
          this.authService.saveUserToLocalStorage(user);
          this.router.navigate(['/']);
          console.log('Auth success: ', user);
        })
      ),
    { dispatch: false }
  );

  authFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginFailure, authActions.registerFailure),
        map(({ error }) => error.error),
        tap((error: HttpErrorBody) => this.notificationService.showError(error.error, error.message))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
