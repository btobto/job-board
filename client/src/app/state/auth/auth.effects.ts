import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { authActions } from '.';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { User } from 'src/app/models';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

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

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.autoLogin),
      map(() => this.authService.getUserFromLocalStorage()),
      exhaustMap((user) =>
        user
          ? of(authActions.loginSuccess({ user }))
          : of(authActions.loginFailure({ error: null }))
      )
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess, authActions.registerSuccess),
        tap(({ user }) => {
          this.authService.saveUserToLocalStorage(user);
          this.router.navigate(['/home']);

          console.log('Login success: ', user);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => {
          this.authService.removeUserFromLocalStorage();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
